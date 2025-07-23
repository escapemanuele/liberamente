import React, { useState } from 'react';
import { ArrowLeft, Calendar, Brain, CheckCircle, AlertTriangle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WeeklyReview = () => {
  const router = useRouter();
  const [showAllDumps, setShowAllDumps] = useState(false);
  
  // Mock data for the weekly review
  const weekRange = "Dec 16 - Dec 22, 2024";
  const totalDumps = 18;
  const completedTodos = 7;
  const totalTodos = 12;
  
  const recurringWorries = [
    { worry: "Project deadline anxiety", frequency: 4 },
    { worry: "Client communication concerns", frequency: 3 },
    { worry: "Work-life balance", frequency: 5 },
    { worry: "Technical implementation doubts", frequency: 2 }
  ];
  
  const suggestions = [
    "Consider breaking down large tasks into smaller, manageable chunks to reduce deadline anxiety",
    "Schedule regular check-ins with clients to improve communication and reduce uncertainty",
    "Set specific work boundaries and create a dedicated wind-down routine",
    "Allocate time for technical research and experimentation to build confidence"
  ];
  
  const weeklyDumps = [
    { id: 1, content: "Worried about the project timeline again...", date: "Dec 16", time: "10:30 AM" },
    { id: 2, content: "Great idea for the mobile app feature!", date: "Dec 16", time: "2:15 PM" },
    { id: 3, content: "Need to follow up with Sarah about the mockups", date: "Dec 17", time: "9:00 AM" },
    { id: 4, content: "Completed the user authentication flow", date: "Dec 17", time: "4:30 PM" },
    { id: 5, content: "Feeling overwhelmed with all the tasks", date: "Dec 18", time: "11:45 AM" },
    // Add more mock data as needed
  ];

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-orange-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-12 h-12 bg-green-300 opacity-40 transform rotate-45"></div>
      <div className="absolute top-1/3 right-20 w-8 h-8 bg-orange-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 left-1/4 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
      <div className="absolute top-1/2 left-10 w-4 h-4 bg-purple-300 rounded-full opacity-30"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={handleBackToDashboard}
          className="mb-8 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-300 rounded-full opacity-80"></div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
              <Calendar className="w-8 h-8 text-orange-500" />
              <span>Weekly Review</span>
            </h1>
            <p className="text-xl text-gray-600 font-medium">{weekRange}</p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-300 rounded-full opacity-80"></div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Brain className="w-6 h-6 text-orange-500" />
            <span>Week Summary</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-100 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-orange-800 font-medium">Total Brain Dumps</p>
                  <p className="text-3xl font-bold text-orange-900">{totalDumps}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-100 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-green-800 font-medium">Completed Tasks</p>
                  <p className="text-3xl font-bold text-green-900">{completedTodos}/{totalTodos}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recurring Worries Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-300 rounded-full opacity-80"></div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span>Recurring Worries</span>
          </h2>
          
          <div className="space-y-4">
            {recurringWorries.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <span className="text-gray-800 font-medium">{item.worry}</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {item.frequency}x
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-300 rounded-full opacity-80"></div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <span>AI Suggestions</span>
          </h2>
          
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <p className="text-gray-800 leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Brain Dumps (Expandable) */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-300 rounded-full opacity-80"></div>
          
          <button
            onClick={() => setShowAllDumps(!showAllDumps)}
            className="w-full flex items-center justify-between text-2xl font-bold text-gray-900 mb-6 hover:text-orange-600 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-orange-500" />
              <span>All Brain Dumps This Week</span>
            </div>
            {showAllDumps ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>
          
          {showAllDumps && (
            <div className="space-y-4 animate-in slide-in-from-top duration-300">
              {weeklyDumps.map((dump) => (
                <div key={dump.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 hover:border-orange-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                      {dump.date} • {dump.time}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{dump.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyReview; 