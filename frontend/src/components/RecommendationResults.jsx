import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/main.css';

const RecommendationResults = ({ data }) => {
    const navigate = useNavigate();
    console.log("Rendering RecommendationResults with data:", data);

    if (!data || !data.recommendations) {
        return <div>No recommendations available</div>;
    }

    const { recommendations, herbal_details } = data;

    const handleReadMore = (herb) => {
        navigate(`/blog/${herb.toLowerCase()}`);
    };

    return (
        <div className="recommendations-container">
            <h2>Recommended Herbal Remedies</h2>
            
            {recommendations.herbs.map((herb, index) => {
                const herbDetail = herbal_details[herb] || {};
                return (
                    <div key={index} className="herb-card">
                        <div className="herb-header">
                            <div className="herb-title">
                                <h3>{herb}</h3>
                                <p className="herb-names">
                                    <span className="hindi">{herbDetail.names?.hindi || ''}</span>
                                    <span className="telugu">{herbDetail.names?.telugu || ''}</span>
                                </p>
                            </div>
                            <img 
                                src={herbDetail.image || `/herbs/${herb.toLowerCase()}.jpg`} 
                                alt={herb}
                                className="herb-image"
                            />
                        </div>

                        <div className="herb-content">
                            <p className="herb-brief">{herbDetail.brief || herbDetail.description}</p>
                            
                            <div className="benefits-preview">
                                <strong>Key Benefits:</strong>
                                <ul>
                                    {(herbDetail.benefits || []).slice(0, 3).map((benefit, idx) => (
                                        <li key={idx}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <button 
                                className="read-more-btn"
                                onClick={() => handleReadMore(herb)}
                            >
                                Read More
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RecommendationResults; 