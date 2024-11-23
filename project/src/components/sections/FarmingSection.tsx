import React from 'react';
import { Plant, Droplets, ThermometerSun } from 'lucide-react';

const FarmingSection = () => {
  return (
    <section id="farming" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">
          Localized Farming Insights
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg mt-1">
                <Plant className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Soil Analysis</h3>
                <p className="text-gray-600">Get detailed insights about your soil composition and recommendations for optimal crop selection.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg mt-1">
                <Droplets className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Water Management</h3>
                <p className="text-gray-600">Learn about water requirements and efficient irrigation techniques for your chosen crops.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg mt-1">
                <ThermometerSun className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Climate Adaptation</h3>
                <p className="text-gray-600">Understand how local climate patterns affect your farming and get seasonal guidance.</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000" 
              alt="Sustainable farming practices" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmingSection;