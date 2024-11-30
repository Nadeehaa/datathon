import React from 'react';
import '../components/styles/main.css';

const RecommendationResults = ({ data }) => {
    console.log("Rendering RecommendationResults with data:", data);

    if (!data || !data.recommendations) {
        return <div>No recommendations available</div>;
    }

    const { recommendations, herbal_details } = data;

    return (
        <div className="recommendations-container">
            <h2>Recommended Herbal Remedies</h2>
            
            {recommendations.herbs.map((herb, index) => {
                const herbDetail = herbal_details[herb] || {};
                return (
                    <div key={index} className="herb-card">
                        <h3>{herb}</h3>
                        <div className="herb-content">
                            <p><strong>Description:</strong> {herbDetail.description}</p>
                            
                            <div className="benefits">
                                <strong>Benefits:</strong>
                                <ul>
                                    {herbDetail.benefits && herbDetail.benefits.map((benefit, idx) => (
                                        <li key={idx}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            {herbDetail.preparations && Object.entries(herbDetail.preparations).map(([method, prep]) => (
                                <div key={method} className="preparation-section">
                                    <h4>{method.charAt(0).toUpperCase() + method.slice(1)} Recipe</h4>
                                    
                                    <div className="ingredients">
                                        <strong>Ingredients:</strong>
                                        <ul>
                                            {prep.ingredients && prep.ingredients.map((ingredient, idx) => (
                                                <li key={idx}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="instructions">
                                        <strong>Instructions:</strong>
                                        <ol>
                                            {prep.instructions && prep.instructions.map((step, idx) => (
                                                <li key={idx}>{step}</li>
                                            ))}
                                        </ol>
                                    </div>

                                    <div className="dosage">
                                        <strong>Recommended Dosage:</strong> {prep.dosage}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RecommendationResults; 