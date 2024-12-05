import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/main.css';

const RecommendationResults = ({ data }) => {
    const navigate = useNavigate();

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
                                onError={(e) => {
                                    e.target.src = '/herbs/default-herb.jpg';
                                }}
                            />
                        </div>

                        <div className="herb-content">
                            <div className="herb-description">
                                <h4>Description</h4>
                                <p>{herbDetail.description}</p>
                            </div>

                            <div className="herb-preparation">
                                <h4>Traditional Preparation</h4>
                                <p>{herbDetail.preparation}</p>
                            </div>

                            <div className="herb-usage">
                                <h4>Common Uses</h4>
                                <ul>
                                    {herbDetail.uses?.map((use, idx) => (
                                        <li key={idx}>{use}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="herb-dosage">
                                <h4>Recommended Dosage</h4>
                                <p>{herbDetail.dosage}</p>
                            </div>

                            <div className="herb-precautions">
                                <h4>Precautions</h4>
                                <p className="precaution-note">{herbDetail.precautions}</p>
                            </div>

                            <div className="confidence-score">
                                <h4>Match Score</h4>
                                <div className="score-bar">
                                    <div 
                                        className="score-fill"
                                        style={{width: `${recommendations.confidence[index]}%`}}
                                    ></div>
                                </div>
                                <span>{recommendations.confidence[index]}% match</span>
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