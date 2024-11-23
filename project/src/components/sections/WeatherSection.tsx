import React from 'react';
import { Cloud, Droplets, Wind, Sun } from 'lucide-react';

const WeatherSection = () => {
  return (
    <section id="weather" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">
          Agricultural Weather Insights
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weatherCards.map((card) => (
            <div key={card.title} className="bg-green-50 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                {card.icon}
                <h3 className="text-xl font-semibold text-green-800 ml-3">{card.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <div className="bg-white rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-green-800">{card.value}</span>
                <span className="text-sm text-gray-500 ml-2">{card.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-green-900 mb-6">7-Day Forecast</h3>
          <div className="grid grid-cols-7 gap-4">
            {forecast.map((day) => (
              <div key={day.date} className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">{day.date}</p>
                {day.icon}
                <p className="text-lg font-bold text-green-800 mt-2">{day.temp}°C</p>
                <p className="text-sm text-gray-500">{day.condition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const weatherCards = [
  {
    icon: <Cloud className="w-6 h-6 text-green-600" />,
    title: "Temperature",
    description: "Current temperature and humidity levels",
    value: "24°C",
    unit: "Humidity: 65%"
  },
  {
    icon: <Droplets className="w-6 h-6 text-green-600" />,
    title: "Rainfall",
    description: "Expected precipitation levels",
    value: "45mm",
    unit: "Next 7 days"
  },
  {
    icon: <Wind className="w-6 h-6 text-green-600" />,
    title: "Wind Speed",
    description: "Current wind conditions",
    value: "12",
    unit: "km/h"
  },
  {
    icon: <Sun className="w-6 h-6 text-green-600" />,
    title: "UV Index",
    description: "Current UV radiation levels",
    value: "6",
    unit: "Moderate"
  }
];

const forecast = [
  { date: "Mon", temp: 24, condition: "Sunny", icon: <Sun className="w-6 h-6 text-green-600 mx-auto" /> },
  { date: "Tue", temp: 23, condition: "Cloudy", icon: <Cloud className="w-6 h-6 text-green-600 mx-auto" /> },
  { date: "Wed", temp: 25, condition: "Sunny", icon: <Sun className="w-6 h-6 text-green-600 mx-auto" /> },
  { date: "Thu", temp: 22, condition: "Rain", icon: <Droplets className="w-6 h-6 text-green-600 mx-auto" /> },
  { date: "Fri", temp: 24, condition: "Sunny", icon: <Sun className="w-6 h-6 text-green-600 mx-auto" /> },
  { date: "Sat", temp: 26, condition: "Sunny", icon: <Sun className="w-6 h-6 text-green-600 mx-auto" /> },
  { date: "Sun", temp: 25, condition: "Cloudy", icon: <Cloud className="w-6 h-6 text-green-600 mx-auto" /> }
];

export default WeatherSection;