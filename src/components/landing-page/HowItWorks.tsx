import React from 'react';
import { Edit3, Brain, CheckCircle, Clock, Shield, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Dump',
      description: 'Rapid-fire text input',
      icon: Edit3,
      detail: 'Just start typing whatever is on your mind. No structure needed.'
    },
    {
      number: '02',
      title: 'Digest',
      description: 'GPT-4 sorts feelings, tasks, worries',
      icon: Brain,
      detail: 'Our AI analyzes your thoughts and categorizes them intelligently.'
    },
    {
      number: '03',
      title: 'Do',
      description: 'Actionable to-dos + weekly progress',
      icon: CheckCircle,
      detail: 'Get clear action items and track your mental wellness over time.'
    }
  ];

  const highlights = [
    { icon: Clock, text: '< 60 sec', color: 'bg-orange-100 text-orange-800' },
    { icon: Shield, text: '100% private', color: 'bg-green-100 text-green-800' },
    { icon: Zap, text: 'Unlimited entries', color: 'bg-blue-100 text-blue-800' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            BrainDump in three quick steps
          </h2>
          <p className="text-xl text-gray-600">
            From mental clutter to clarity in under a minute
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-200">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <step.icon className="w-6 h-6 text-orange-500" />
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-lg mb-2">{step.description}</p>
                  <p className="text-sm text-gray-500">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Mockup */}
          <div className="relative">
            <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-6 h-96 relative overflow-hidden">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-gray-900">BrainDump</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3 text-sm">
                    I have so much to do and I'm feeling overwhelmed...
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-sm border-l-4 border-orange-500">
                    <strong>AI Insight:</strong> I notice you're feeling overwhelmed
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-sm">
                    <strong>To-Do:</strong> Break down your tasks into smaller steps
                  </div>
                </div>
                
                {/* Animated typing indicator */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is analyzing...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlight chips */}
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((highlight, index) => (
                <div key={index} className={`${highlight.color} px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium`}>
                  <highlight.icon className="w-4 h-4" />
                  <span>{highlight.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;