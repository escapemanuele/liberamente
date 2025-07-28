'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Lightbulb, CheckSquare, Square, Edit, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { supabase, BrainDump, AIOutput, Todo } from '@/src/lib/supabaseClient';

interface BrainDumpWithDetails extends BrainDump {
  ai_outputs?: AIOutput[];
  todos?: Todo[];
}

const BrainDumpDetails: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [brainDump, setBrainDump] = useState<BrainDumpWithDetails | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [worries, setWorries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    if (id) {
      fetchBrainDumpData(id);
    }
  }, [id]);

  const fetchBrainDumpData = async (brainDumpId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch brain dump with AI outputs and todos
      const { data: brainDumpData, error: brainDumpError } = await supabase
        .from('brain_dumps')
        .select(`
          *,
          ai_outputs(*),
          todos(*)
        `)
        .eq('id', brainDumpId)
        .single();

      if (brainDumpError) {
        throw brainDumpError;
      }

      if (!brainDumpData) {
        setError('Brain dump not found');
        return;
      }

      setBrainDump(brainDumpData);
      setTodos(brainDumpData.todos || []);

      // Process AI outputs into insights and worries
      const aiOutputs = brainDumpData.ai_outputs || [];
      const summaryOutputs = aiOutputs.filter((output: AIOutput) => output.kind === 'summary');
      
      // For now, we'll extract insights and worries from the summary content
      // In a real implementation, you might have separate AI output types
      const allInsights: string[] = [];
      const allWorries: string[] = [];
      
      summaryOutputs.forEach((output: AIOutput) => {
        try {
          const parsed = JSON.parse(output.content);
          if (parsed.insights) allInsights.push(...parsed.insights);
          if (parsed.worries) allWorries.push(...parsed.worries);
        } catch {
          // If not JSON, treat as plain text insight
          allInsights.push(output.content);
        }
      });

      setInsights(allInsights);
      setWorries(allWorries);
    } catch (err) {
      console.error('Error fetching brain dump:', err);
      setError(err instanceof Error ? err.message : 'Failed to load brain dump');
    } finally {
      setLoading(false);
    }
  };

  const handleTodoToggle = async (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update({ done: !todo.done })
        .eq('id', todoId);

      if (error) throw error;

      setTodos(todos.map(t => 
        t.id === todoId ? { ...t, done: !t.done } : t
      ));
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  const handleEditTodo = (todoId: string, text: string) => {
    setEditingTodo(todoId);
    setEditText(text);
  };

  const handleSaveEdit = async (todoId: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ title: editText })
        .eq('id', todoId);

      if (error) throw error;

      setTodos(todos.map(todo => 
        todo.id === todoId ? { ...todo, title: editText } : todo
      ));
      setEditingTodo(null);
      setEditText('');
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todoId);

      if (error) throw error;

      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setEditText('');
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    }
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading brain dump...</p>
        </div>
      </div>
    );
  }

  if (error || !brainDump) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-500" />
          <p className="text-gray-600 mb-4">{error || 'Brain dump not found'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-12 h-12 bg-green-300 opacity-40 transform rotate-45"></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 bg-orange-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 left-1/4 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-10 w-10 h-10 bg-purple-300 opacity-30 transform rotate-12"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back Button */}
        <button
                      onClick={() => router.push('/dashboard')}
          className="mb-6 bg-white hover:bg-orange-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Brain Dump Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-300 rounded-full opacity-80"></div>
          
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              {formatTimestamp(brainDump.created_at)}
            </span>
          </div>
          
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            {brainDump.content}
          </p>

          <button 
            onClick={() => router.push(`/braindump/${id}/edit`)}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
          >
            <Edit className="w-5 h-5" />
            <span>Edit Brain Dump</span>
          </button>
        </div>

        {/* Insights Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-300 rounded-full opacity-80"></div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <span>Insights</span>
          </h3>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 hover:bg-yellow-100 transition-colors duration-200">
                <p className="text-gray-700 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* To-Dos Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-300 rounded-full opacity-80"></div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <CheckSquare className="w-6 h-6 text-green-500" />
            <span>To-Dos</span>
          </h3>
          
          <div className="space-y-4">
            {todos.map((todo) => (
              <div key={todo.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => handleTodoToggle(todo.id)}
                      className="text-green-500 hover:text-green-600 transition-colors duration-200"
                    >
                      {todo.done ? (
                        <CheckSquare className="w-5 h-5" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                    
                    {editingTodo === todo.id ? (
                      <div className="flex-1 flex items-center space-x-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(todo.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className={`flex-1 ${todo.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {todo.title}
                      </span>
                    )}
                  </div>
                  
                  {editingTodo !== todo.id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTodo(todo.id, todo.title)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worries Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-red-300 rounded-full opacity-80"></div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span>Worries</span>
          </h3>
          
          <div className="space-y-3">
            {worries.map((worry, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-4 hover:bg-red-100 transition-colors duration-200">
                <p className="text-gray-700 leading-relaxed">{worry}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainDumpDetails; 