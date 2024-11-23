import React from 'react';
import { Leaf, Sprout, Heart, Cloud, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596235336783-8d1861ad6fbb?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
      
      {/* Main Content */}
      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Discover the Wisdom of Ayurvedic Agriculture
          </h1>
          <p className="text-xl text-green-800 mb-8">
            Bridging ancient knowledge with modern farming practices for a healthier tomorrow
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category.title} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <span className="p-3 bg-green-100 rounded-lg">
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold ml-4 text-green-800">{category.title}</h3>
              </div>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const categories = [
  {
    title: "Localized Farming",
    description: "Get personalized farming insights based on your region, soil type, and climate conditions.",
    icon: <Sprout className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Market Trends",
    description: "Stay updated with Ayurvedic crop market trends and discover profitable opportunities.",
    icon: <Leaf className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Health Guide",
    description: "Receive tailored Ayurvedic recommendations based on your health profile.",
    icon: <Heart className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Weather Insights",
    description: "Access accurate agricultural predictions and weather forecasts for optimal farming.",
    icon: <Cloud className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Knowledge Hub",
    description: "Explore our comprehensive guide to Ayurvedic plants and their traditional uses.",
    icon: <BookOpen className="w-6 h-6 text-green-600" />,
  },
];

export default Hero;