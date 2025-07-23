import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const EditBrainDump: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in real app, this would be fetched based on the ID
  const [brainDumpText, setBrainDumpText] = useState(
    "Remember to follow up with the client about the project timeline. They mentioned wanting to see mockups by Friday and we need to align on the final deliverables. Also thinking about how we can improve our design process and maybe implement some new tools. Worried about the tight deadline though."
  );

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving brain dump:', brainDumpText);
    router.push(`/brain-dump/${id}`);
  };

  const handleCancel = () => {
    router.push(`/brain-dump/${id}`);
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
        {/* Back/Cancel Button */}
        <button
          onClick={handleCancel}
          className="mb-6 bg-white hover:bg-orange-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Cancel</span>
        </button>

        {/* Edit Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-300 rounded-full opacity-80"></div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Brain Dump</h1>
          
          {/* Textarea */}
          <div className="mb-8">
            <textarea
              value={brainDumpText}
              onChange={(e) => setBrainDumpText(e.target.value)}
              className="w-full h-64 p-6 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 text-lg leading-relaxed"
              placeholder="What's on your mind?"
              autoFocus
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
            
            <button
              onClick={handleCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-8 rounded-xl font-medium transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBrainDump; 