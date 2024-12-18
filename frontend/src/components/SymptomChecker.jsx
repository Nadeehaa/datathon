import React, { useState } from 'react';
import axios from 'axios';
import './styles/SymptomChecker.css';
import { symptoms } from '../data/symptoms';

const SymptomChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);

    const handleSymptomSelect = (symptom) => {
        setSelectedSymptoms(prev => 
            prev.includes(symptom) 
                ? prev.filter(s => s !== symptom)
                : [...prev, symptom]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (selectedSymptoms.length === 0) {
            setError('Please select at least one symptom');
            return;
        }

        setLoading(true);
        setError(null);

        console.log('Submitting symptoms:', selectedSymptoms); // Debugging line

        try {
            const response = await axios.post('http://localhost:5000/recommend', {
                symptoms: selectedSymptoms
            });

            console.log('Received response:', response); // Debugging line
            setRecommendations(response.data);
        } catch (err) {
            setError('Failed to fetch recommendations. Please try again.');
            console.error('Recommendation error:', err.response || err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="symptom-checker">
            <div className="symptom-selection">
                <h2>Select Your Symptoms</h2>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    {Object.entries(symptoms).map(([category, { title, symptoms: categorySymptoms }]) => (
                        <div key={category} className="symptom-category">
                            <h3>{title}</h3>
                            <div className="symptoms-grid">
                                {categorySymptoms.map((symptom) => (
                                    <div 
                                        key={symptom}
                                        className={`symptom-chip ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                                        onClick={() => handleSymptomSelect(symptom)}
                                    >
                                        {symptom}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {selectedSymptoms.length > 0 && (
                        <div className="selected-symptoms">
                            <h3>Selected Symptoms:</h3>
                            <div className="selected-chips">
                                {selectedSymptoms.map((symptom) => (
                                    <div key={symptom} className="selected-chip">
                                        {symptom}
                                        <span 
                                            className="remove-symptom"
                                            onClick={() => handleSymptomSelect(symptom)}
                                        >
                                            ×
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading || selectedSymptoms.length === 0}
                    >
                        {loading ? 'Finding Ayurvedic Remedies...' : 'Get Herbal Recommendations'}
                    </button>
                </form>
            </div>

            {recommendations.length > 0 && (
                <div className="recommendations-container">
                    <h2 className="recommendations-title">Your Ayurvedic Recommendations</h2>
                    <div className="recommendations-grid">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="recommendation-card">
                                <div className="recommendation-header">
                                    <h3>Recommendation {index + 1}</h3>
                                    <span className="match-score">
                                        {Math.round(rec.confidence * 100)}% Match
                                    </span>
                                </div>
                                <div className="recommendation-body">
                                    <div className="herbs-section">
                                        <h4>Recommended Herbs</h4>
                                        <ul className="herbs-list">
                                            {rec.remedies.map((remedy, idx) => (
                                                <li key={idx}>{remedy}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="details-section">
                                        <div className="detail-item">
                                            <h4>Original Symptoms</h4>
                                            <p>{rec.symptoms.join(', ')}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4>Ingredients</h4>
                                            <p>{rec.ingredients}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4>Instructions</h4>
                                            <p>{rec.instructions}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4>Recipe</h4>
                                            <p>{rec.recipe}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4>Dosage</h4>
                                            <p>{rec.dosage}</p>
                                        </div>
                                        <div className="extra-details">
                                            <div className="detail-item">
                                                <h4>Effectiveness Rating</h4>
                                                <p>{rec.effectiveness_rating}/5</p>
                                            </div>
                                            <div className="detail-item">
                                                <h4>Suitable Seasons</h4>
                                                <p>{rec.season_suitable.join(', ')}</p>
                                            </div>
                                            <div className="detail-item">
                                                <h4>Severity Level</h4>
                                                <p>{rec.severity_level}</p>
                                            </div>
                                            <div className="detail-item">
                                                <h4>Recommended For</h4>
                                                <p>{rec.demographics.join(', ')}</p>
                                            </div>
                                            <div className="detail-item">
                                                <h4>Contraindications</h4>
                                                <p>{rec.contraindications.join(', ') || 'None'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Finding the best herbal recommendations for you...</p>
                </div>
            )}
        </div>
    );
};

export default SymptomChecker;
