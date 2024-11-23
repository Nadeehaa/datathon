import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FarmingSection from './components/sections/FarmingSection';
import MarketSection from './components/sections/MarketSection';
import HealthSection from './components/sections/HealthSection';
import WeatherSection from './components/sections/WeatherSection';
import LearnSection from './components/sections/LearnSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <FarmingSection />
        <MarketSection />
        <HealthSection />
        <WeatherSection />
        <LearnSection />
      </main>
    </div>
  );
}

export default App;