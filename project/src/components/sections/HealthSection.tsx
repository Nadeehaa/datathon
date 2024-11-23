import React from 'react';
import { Heart, Brain, Leaf } from 'lucide-react';

const HealthSection = () => {
  return (
    <section id="health" className="py-20 bg-green-50/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">
          Personalized Health Recommendations
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-green-800">Dosha Analysis</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Discover your unique body constitution and receive personalized Ayurvedic recommendations.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Take Assessment
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-green-800">Wellness Goals</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Set your health objectives and get customized crop recommendations aligned with your goals.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Set Goals
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Leaf className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-green-800">Crop Benefits</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn about the health benefits of different Ayurvedic crops and their traditional uses.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Explore Benefits
              </button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2000" 
              alt="Healthy Ayurvedic ingredients" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent flex items-end p-8">
              <p className="text-white text-xl font-medium">
                Discover the perfect balance of nutrition and wellness with our personalized Ayurvedic recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthSection;