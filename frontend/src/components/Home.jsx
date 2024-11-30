import React, { useState } from 'react';
import axios from 'axios';
import SymptomChecker from './SymptomChecker';
import RecommendationResults from './RecommendationResults';

const Home = () => {
    const [recommendations, setRecommendations] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSymptomSubmit = async (symptoms) => {
        console.log("Submitting symptoms:", symptoms);
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post('http://localhost:5001/api/analyze-symptoms', {
                symptoms: symptoms
            });
            console.log("Received response:", response.data);
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error getting recommendations:', error);
            setError('Failed to get recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
            <h1>Herbal Medicine Recommendation System</h1>
            <div className="main-content">
                <SymptomChecker onSubmit={handleSymptomSubmit} />
                {isLoading && <div className="loader">Processing...</div>}
                {error && <div className="error-message">{error}</div>}
                {recommendations && <RecommendationResults data={recommendations} />}
            </div>
        </div>
    );
};

export default Home; 