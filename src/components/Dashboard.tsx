import React, { useState, useEffect } from 'react';
import { Brain, Plus, Eye, Edit, Trash2, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createBrainDump, fetchBrainDumps } from '../lib/braindumps';
import { BrainDump } from '../lib/supabase';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [newDump, setNewDump] = useState('');
  const [canDump, setCanDump] = useState(true);
  const [todaysDumps, setTodaysDumps] = useState<BrainDump[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user && profile) {
      // Check quota
      setCanDump(profile.is_premium || profile.quota_remaining > 0);
      
      // Fetch brain dumps
      fetchBrainDumps(10).then(({ data, error }) => {
        if (error) {
          console.error('Error fetching brain dumps:', error);
        } else {
          setTodaysDumps(data || []);
        }
        setIsLoading(false);
      });
    }
  }, [user, profile]);

  const handleSubmitDump = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDump.trim() || !canDump) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await createBrainDump({ content: newDump.trim() });
      
      if (error) {
        console.error('Error creating brain dump:', error);
        // TODO: Show error message to user
      } else if (data) {
        // Add new dump to the list
        setTodaysDumps(prev => [data, ...prev]);
        setNewDump('');
        
        // Update quota if not premium
        if (profile && !profile.is_premium) {
          // Note: The backend trigger handles quota decrement
          setCanDump(profile.quota_remaining > 1);
        }
      }
    } catch (error) {
      console.error('Error creating brain dump:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDump = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete dump:', id);
  };

  const handleEditDump = (id: string) => {
    navigate(`/brain-dump/${id}/edit`);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/brain-dump/${id}`);
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-orange-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-12 h-12 bg-green-300 opacity-40 transform rotate-45"></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 bg-orange-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 left-1/4 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* New Brain Dump Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-300 rounded-full opacity-80"></div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Plus className="w-6 h-6 text-orange-500" />
            <span>What's on your mind?</span>
          </h2>
          
          <form onSubmit={handleSubmitDump} className="space-y-4">
            <textarea
              value={newDump}
              onChange={(e) => setNewDump(e.target.value)}
              placeholder="Dump your thoughts here... Ideas, tasks, reminders, anything!"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none hover:border-gray-300"
              rows={4}
            />
            <button
              type="submit"
              disabled={!newDump.trim() || !canDump || isSubmitting}
              className={`${
                !canDump || isSubmitting ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
              } text-white py-3 px-8 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl`}
            >
              {isSubmitting ? 'Dumping...' : canDump ? 'Dump It!' : 'Upgrade to keep dumping'}
            </button>
          </form>
        </div>

        {/* Today's Brain Dumps */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-300 rounded-full opacity-80"></div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Brain Dumps</h3>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading your brain dumps...</p>
            </div>
          ) : todaysDumps.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No brain dumps yet today. Start dumping!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todaysDumps.map((dump) => (
                <div key={dump.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-orange-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                      {formatTimestamp(dump.created_at)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {dump.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleViewDetails(dump.id)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    
                    <button
                      onClick={() => handleEditDump(dump.id)}
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    
                    <button
                      onClick={() => handleDeleteDump(dump.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Review Button */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/weekly-review')}
            className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-3 shadow-2xl hover:shadow-3xl mx-auto"
          >
            <Calendar className="w-6 h-6" />
            <span>Weekly Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 