import React from 'react';
import './styles/main.css';

const RecommendationResults = ({ data }) => {
    if (!data || !data.recommendations) {
        return <div className="no-recommendations">No recommendations available</div>;
    }

    const { recommendations, herbal_details } = data;

    return (
        <div className="recommendations-container">
            <h2>Recommended Herbal Remedies</h2>
            
            {recommendations.herbs.map((herb, index) => {
                const herbDetail = herbal_details[herb];
                const confidence = recommendations.confidence[index];
                
                return (
                    <div key={index} className="herb-card">
                        <div className="herb-header">
                            <h3>{herb}</h3>
                            <div className="confidence-score">
                                <div className="score-bar">
                                    <div 
                                        className="score-fill"
                                        style={{width: `${confidence}%`}}
                                    ></div>
                                </div>
                                <span>{confidence.toFixed(1)}% match</span>
                            </div>
                        </div>

                        <div className="herb-content">
                            <div className="herb-dosage">
                                <h4>Recommended Dosage</h4>
                                <p>{herbDetail.dosage}</p>
                            </div>

                            <div className="herb-effectiveness">
                                <h4>Effectiveness Rating</h4>
                                <p>{herbDetail.effectiveness}/5</p>
                            </div>

                            <div className="herb-precautions">
                                <h4>Precautions</h4>
                                <ul>
                                    {herbDetail.contraindications.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="herb-instructions">
                                <h4>Instructions</h4>
                                <p>{herbDetail.instructions}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RecommendationResults; 