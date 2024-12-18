import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SymptomChecker from './SymptomChecker';
import RecommendationResults from './RecommendationResults';
import './styles/home.css';
import './styles/main.css';
import api from '../api/config';

const Home = () => {
    // ... all your existing state and functions ...

    const handleSymptomSubmit = async (symptoms) => {
        try {
            const response = await api.post('/recommendations', { symptoms });
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            // Show user-friendly error message
            setError(error.message);
        }
    };

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Discover the Ancient Wisdom of Ayurveda
                </h1>
                <p className="hero-subtitle">
                    Empowering Health Enthusiasts & Farmers with Natural Healing Solutions
                </p>
                <button className="get-started-btn" onClick={scrollToSystem}>
                    Get Started
                </button>
            </div>
            <div id="recommendation-system" className="system-section">
                <div className="recommendation-content">
                    <SymptomChecker onSubmit={handleSymptomSubmit} />
                    {isLoading && (
                        <div className="loader">
                            <div className="loader-spinner"></div>
                            <p>Analyzing your symptoms...</p>
                        </div>
                    )}
                    {error && <div className="error-message">{error}</div>}
                    {recommendations && <RecommendationResults data={recommendations} />}
                </div>
            </div>
        </section>
    );
};

export default Home; 