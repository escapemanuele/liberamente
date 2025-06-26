import React, { useState } from 'react';
import { ArrowLeft, Clock, Lightbulb, CheckSquare, Square, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

const BrainDumpDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  
  // Mock data for the brain dump (in real app, this would be fetched based on the ID)
  const brainDump = {
    id: id || '1',
    content: "Remember to follow up with the client about the project timeline. They mentioned wanting to see mockups by Friday and we need to align on the final deliverables. Also thinking about how we can improve our design process and maybe implement some new tools. Worried about the tight deadline though.",
    timestamp: "Today, 10:30 AM",
    date: "March 15, 2024"
  };

  const [insights] = useState([
    "Client communication is crucial for project success",
    "Mockups are needed by Friday - this is a hard deadline",
    "Process improvement opportunities exist in the design workflow",
    "New tools could streamline the development process"
  ]);

  const [todos, setTodos] = useState<ToDo[]>([
    { id: 1, text: "Follow up with client about project timeline", completed: false },
    { id: 2, text: "Prepare mockups for Friday deadline", completed: false },
    { id: 3, text: "Research new design tools", completed: true },
    { id: 4, text: "Align on final deliverables with team", completed: false }
  ]);

  const [worries] = useState([
    "The Friday deadline might be too tight",
    "Client expectations may not align with our timeline",
    "New tools implementation could slow down current projects",
    "Team might be overwhelmed with additional tasks"
  ]);

  const handleTodoToggle = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditingTodo(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingTodo(null);
    setEditText('');
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setEditText('');
  };

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
          onClick={() => navigate('/dashboard')}
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
              {brainDump.timestamp}
            </span>
          </div>
          
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            {brainDump.content}
          </p>

          <button 
            onClick={() => navigate(`/brain-dump/${id}/edit`)}
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
                      {todo.completed ? (
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
                      <span className={`flex-1 ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {todo.text}
                      </span>
                    )}
                  </div>
                  
                  {editingTodo !== todo.id && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTodo(todo.id, todo.text)}
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