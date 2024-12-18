import React, { useEffect, useState } from 'react';
import SymptomChecker from '../components/SymptomChecker';
import '../components/styles/home.css';
import axios from 'axios';

const Home = () => {
    const [showSymptomChecker, setShowSymptomChecker] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);

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
                }, 5173);
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

    const handleSymptomSubmit = async (symptoms) => {
        try {
            const response = await axios.post('http://localhost:5173/api/recommendations', {
                symptoms: symptoms
            });
            
            if (response.data && response.data.recommendations) {
                return response.data.recommendations;
            }
            return [];
            
        } catch (error) {
            console.error('Error:', error);
            return [];
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
                            <SymptomChecker 
                                onSubmit={handleSymptomSubmit}
                                loading={loading}
                                recommendations={recommendations}
                            />
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