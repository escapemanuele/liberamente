import React, { useState } from 'react';
import { BarChart3, Target, Zap, TrendingUp } from 'lucide-react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('College');
  const tabs = ['K-12', 'College', 'Grad', 'Faculty'];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Tab controls */}
          <div className="bg-orange-500 rounded-3xl p-8 text-white">
            <h2 className="text-4xl font-bold mb-8">
              Built for every student journey
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              From high school stress to PhD burnout, BrainDump adapts to your academic level.
            </p>
            
            <div className="space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    activeTab === tab 
                      ? 'bg-white text-orange-500 shadow-lg' 
                      : 'bg-orange-400 hover:bg-orange-300 text-white'
                  }`}
                >
                  <span className="font-bold text-lg">{tab}</span>
                  <div className="text-sm opacity-90 mt-1">
                    {tab === 'K-12' && 'Homework stress & social anxiety'}
                    {tab === 'College' && 'Workload management & career prep'}
                    {tab === 'Grad' && 'Research pressure & imposter syndrome'}
                    {tab === 'Faculty' && 'Work-life balance & burnout prevention'}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side - Dashboard mockup */}
          <div className="relative">
            <div className="bg-gray-100 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Weekly Review</h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <Zap className="w-5 h-5" />
                    <span className="font-bold">7-day streak!</span>
                  </div>
                </div>
                
                {/* Mood trend chart */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-900">Mood Trends</h4>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-4 flex items-end space-x-2">
                    {[40, 60, 30, 80, 70, 90, 85].map((height, index) => (
                      <div key={index} className="flex-1">
                        <div 
                          className="bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-gray-600">Tasks Completed</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 text-center">
                    <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600">4.2</div>
                    <div className="text-sm text-gray-600">Avg Mood Score</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating achievement badge */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="text-xs font-bold text-center">
                <div>STREAK</div>
                <div className="text-lg">7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;