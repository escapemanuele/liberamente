import React from 'react';

const TrustBar = () => {
  const logos = [
    { name: 'Berkeley', width: 'w-20' },
    { name: 'UCLA', width: 'w-16' },
    { name: 'Purdue', width: 'w-24' },
    { name: 'Powered by OpenAI', width: 'w-32', special: true }
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {logos.map((logo, index) => (
            <div key={index} className={`${logo.width} h-12 bg-gray-200 rounded-lg flex items-center justify-center ${logo.special ? 'bg-black text-white' : 'text-gray-400'}`}>
              <span className="text-sm font-medium">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;