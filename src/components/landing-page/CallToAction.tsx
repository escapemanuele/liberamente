import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="bg-gray-900 py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 opacity-20 transform rotate-45"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Harness your thoughts.{' '}
            <span className="text-orange-400">Own your growth.</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of students who've transformed their mental clutter into clarity and action.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-3 shadow-lg">
              <span>Create a free account</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Sparkles className="w-5 h-5" />
              <span>No credit card • 2-minute setup</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-gray-400 text-sm">
            <div>✓ 100% Private</div>
            <div>✓ Always Free Plan</div>
            <div>✓ Cancel Anytime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;