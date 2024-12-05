import React, { useEffect, useState } from 'react';
import SymptomChecker from '../components/SymptomChecker';
import '../components/styles/home.css';
import api from '../services/api';

const Home = () => {
    const [showSymptomChecker, setShowSymptomChecker] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const createLeaf = () => {
            const leaf = document.createElement('div');
            leaf.className = 'falling-leaf';
            leaf.style.left = Math.random() * 100 + 'vw';
            leaf.style.animationDuration = Math.random() * 3 + 2 + 's';
            leaf.style.opacity = Math.random() * 0.5 + 0.5;
            
            const isFlower = Math.random() > 0.7;
            leaf.innerHTML = isFlower ? '🌸' : '🍃';
            
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.appendChild(leaf);
                setTimeout(() => {
                    leaf.remove();
                }, 5000);
            }
        };

        const leafInterval = setInterval(createLeaf, 300);
        return () => clearInterval(leafInterval);
    }, []);

    const handleGetStarted = () => {
        setShowSymptomChecker(true);
        const remediesSection = document.getElementById('remedies-section');
        if (remediesSection) {
            const navbarHeight = 60;
            const elementPosition = remediesSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="home-container">
            <main className="main-content">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Discover the Ancient Wisdom of Ayurveda
                        </h1>
                        <p className="hero-subtitle">
                            Empowering Health Enthusiasts & Farmers with Natural Healing Solutions
                        </p>
                        <button className="get-started-btn" onClick={handleGetStarted}>
                            Get Started
                        </button>
                    </div>
                </section>

                <section id="remedies-section" className="remedies-section">
                    <div className="remedies-content">
                        {showSymptomChecker ? (
                            <SymptomChecker />
                        ) : (
                            <div className="placeholder-message">
                                <h2>Click "Get Started" to begin your wellness journey</h2>
                                <p>We'll help you find the perfect herbal remedies for your needs.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home; 