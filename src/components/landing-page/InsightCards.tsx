import React from 'react';
import { TrendingUp, CheckSquare, AlertTriangle, ArrowRight } from 'lucide-react';

const InsightCards = () => {
  const cards = [
    {
      type: 'Insights',
      icon: TrendingUp,
      title: 'Pattern Recognition',
      content: 'You mention deadlines often. Consider time management strategies.',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      type: 'Auto To-dos',
      icon: CheckSquare,
      title: 'Action Items',
      content: 'Finish physics lab\nEmail advisor\nSchedule study group',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      type: 'Worry Detector',
      icon: AlertTriangle,
      title: 'Stress Alert',
      content: 'High stress spike flagged. Recommended: 5-minute breathing exercise.',
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <section className="py-20 bg-green-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-20 w-16 h-16 bg-yellow-300 rounded-full opacity-30 transform rotate-12"></div>
      <div className="absolute bottom-20 right-32 w-12 h-12 bg-orange-300 opacity-40 transform -rotate-12"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your thoughts, <span className="text-green-700">organized</span>
          </h2>
          <p className="text-xl text-gray-600">
            See how AI transforms your mental clutter into actionable insights
          </p>
        </div>

        {/* Horizontal scrolling cards */}
        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
          {cards.map((card, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <div className={`${card.color} border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative`}>
                {/* Doodle accent */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-300 rounded-full opacity-80"></div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                    <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">{card.type}</span>
                    <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                  <p className="text-gray-700 whitespace-pre-line">{card.content}</p>
                </div>
                
                <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightCards;