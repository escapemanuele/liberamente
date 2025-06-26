import React from 'react';
import { Award, Shield, Users } from 'lucide-react';

const ExpertSeal = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Built with therapists & AI researchers
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our prompts are developed using evidence-based therapeutic techniques combined with cutting-edge AI research. 
                Every insight is designed to promote genuine mental wellness, not just productivity.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Clinical Validation</h3>
                  <p className="text-gray-600">Techniques rooted in CBT and mindfulness practices</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Privacy First</h3>
                  <p className="text-gray-600">End-to-end encryption with zero data retention</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Ethical AI</h3>
                  <p className="text-gray-600">Transparent algorithms with human oversight</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Expert profile */}
          <div className="relative">
            <div className="bg-yellow-300 rounded-3xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="Dr. Expert" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Maya Patel</h3>
                <p className="text-gray-600 mb-4">Lead Clinical Advisor</p>
                
                {/* Badges */}
                <div className="space-y-2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    LICENSED THERAPIST
                  </div>
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    AI ETHICIST
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating certification */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="font-bold text-sm">Certified</div>
                  <div className="text-xs text-gray-600">Mental Health Tech</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertSeal;