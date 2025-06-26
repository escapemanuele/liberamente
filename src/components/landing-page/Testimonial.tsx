import React from 'react';
import { Quote } from 'lucide-react';

const Testimonial = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Portrait */}
          <div className="relative">
            <div className="w-80 h-80 bg-yellow-300 rounded-full mx-auto relative overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/3762811/pexels-photo-3762811.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                alt="Student testimonial"
                className="w-full h-full object-cover scale-110"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-300 opacity-60 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Right side - Quote */}
          <div className="space-y-8">
            <div className="relative">
              <Quote className="w-16 h-16 text-yellow-300 absolute -top-4 -left-4" />
              <blockquote className="text-3xl font-serif text-gray-900 leading-relaxed relative z-10">
                "I didn't realize how stressed I was until BrainDump showed me.{' '}
                <span className="relative">
                  Now I actually understand my thoughts.
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10c30-8 60-4 90-6 30-2 60 2 90-2 30-4 60-2 90 2" 
                          stroke="#FCD34D" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
                "
              </blockquote>
            </div>
            
            <div className="space-y-2">
              <p className="text-xl font-bold text-gray-900">Sarah Chen</p>
              <p className="text-gray-600">Junior • UC Davis</p>
            </div>
            
            {/* Rating stars */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-yellow-400 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;