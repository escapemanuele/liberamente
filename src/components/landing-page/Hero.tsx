"use client"

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const handleStartDumping = () => {
    router.push('/dashboard');
  };

  return (
    <section className="bg-orange-50 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-20 w-8 h-8 bg-yellow-300 rounded-full opacity-70"></div>
      <div className="absolute bottom-20 right-32 w-6 h-6 bg-green-300 rounded-full opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                An AI journal that{' '}
                <span className="text-orange-500 relative">
                  untangles
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10c20-8 40-4 60-6 20-2 40 2 60-2 20-4 40-2 60 2" 
                          stroke="#FCD34D" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>{' '}
                student minds.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Type your thoughts. Get instant insights, to-dos, and calm.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleStartDumping}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Start Dumping</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span>Free to start • No credit card required</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Visual collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                  <img src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                       alt="Student thinking" className="w-full h-32 object-cover rounded-lg" />
                  <div className="mt-2">
                    <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Stressed</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                       alt="Student studying" className="w-full h-32 object-cover rounded-lg" />
                  <div className="mt-2">
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Focused</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-lg transform -rotate-1 hover:rotate-2 transition-transform duration-300">
                  <img src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                       alt="Student smiling" className="w-full h-32 object-cover rounded-lg" />
                  <div className="mt-2">
                    <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Confident</div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-2 hover:-rotate-1 transition-transform duration-300">
                  <img src="https://images.pexels.com/photos/3762776/pexels-photo-3762776.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                       alt="Student relaxed" className="w-full h-32 object-cover rounded-lg" />
                  <div className="mt-2">
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Calm</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating doodle elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute top-1/2 -left-6 w-8 h-8 bg-green-300 rotate-45 opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;