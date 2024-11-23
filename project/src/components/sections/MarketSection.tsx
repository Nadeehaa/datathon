import React from 'react';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

const MarketSection = () => {
  return (
    <section id="market" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">
          Ayurvedic Crop Market Trends
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-green-800">Growth Analysis</h3>
            </div>
            <p className="text-gray-600 mb-4">Track market growth patterns and identify emerging opportunities in the Ayurvedic crop sector.</p>
            <div className="h-48 bg-white rounded-lg p-4">
              {/* Placeholder for actual chart */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Growth Chart
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <BarChart2 className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-green-800">Price Trends</h3>
            </div>
            <p className="text-gray-600 mb-4">Monitor price fluctuations and seasonal variations to optimize your selling strategy.</p>
            <div className="h-48 bg-white rounded-lg p-4">
              {/* Placeholder for actual chart */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Price Chart
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <PieChart className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-green-800">Demand Distribution</h3>
            </div>
            <p className="text-gray-600 mb-4">Understand market demand across different regions and consumer segments.</p>
            <div className="h-48 bg-white rounded-lg p-4">
              {/* Placeholder for actual chart */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Distribution Chart
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;