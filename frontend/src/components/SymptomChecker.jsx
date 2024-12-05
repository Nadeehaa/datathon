import React, { useState } from 'react';
import RecommendationResults from './RecommendationResults';
import api from '../api/axios';
import './styles/main.css';

const SymptomChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [recommendations, setRecommendations] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const symptomCategories = {
        "Digestive Health": [
            "Bloating",
            "Gas",
            "Constipation",
            "Indigestion",
            "Nausea",
            "Poor Digestion",
            "Loss of Appetite"
        ],
        "Immune Support": [
            "Weak Immunity",
            "Frequent Cold",
            "Mild Fever",
            "Low Energy",
            "Seasonal Illness",
            "Recovery Support"
        ],
        "Respiratory Health": [
            "Common Cold",
            "Dry Cough",
            "Wet Cough",
            "Sore Throat",
            "Nasal Congestion",
            "Seasonal Allergies"
        ],
        "Stress & Sleep": [
            "Mild Anxiety",
            "Stress",
            "Insomnia",
            "Sleep Issues",
            "Mental Fatigue",
            "Nervous Tension"
        ],
        "Joint & Muscle": [
            "Joint Pain",
            "Muscle Pain",
            "Inflammation",
            "Stiffness",
            "Body Aches"
        ],
        "Skin Care": [
            "Acne",
            "Minor Rashes",
            "Dry Skin",
            "Itching",
            "Minor Cuts",
            "Skin Allergies"
        ],
        "Women's Health": [
            "Menstrual Cramps",
            "PMS Symptoms",
            "Mild Menopause Symptoms",
            "White Discharge"
        ],
        "Hair & Scalp": [
            "Hair Loss",
            "Dandruff",
            "Scalp Itching",
            "Premature Graying"
        ],
        "Oral Health": [
            "Mouth Ulcers",
            "Gum Problems",
            "Bad Breath",
            "Throat Irritation"
        ],
        "Liver Support": [
            "Poor Digestion",
            "Detoxification",
            "Mild Liver Issues"
        ]
    };

    const remedyMappings = {
        "Digestive Health": {
            "Triphala": {
                symptoms: ["Constipation", "Indigestion", "Poor Digestion"],
                ingredients: "Amalaki, Bibhitaki, Haritaki",
                instructions: "Take with warm water before bed",
                recipe: "1/2 teaspoon powder with warm water",
                dosage: "Once daily before bed",
                effectiveness: 4.5
            },
            "Ginger": {
                symptoms: ["Nausea", "Indigestion", "Gas", "Bloating"],
                ingredients: "Fresh ginger root",
                instructions: "Steep in hot water for 10 minutes",
                recipe: "1-inch ginger piece in 1 cup water",
                dosage: "2-3 times daily after meals",
                effectiveness: 4.3
            },
            "Hingvastak": {
                symptoms: ["Poor Digestion", "Gas", "Bloating", "Loss of Appetite"],
                ingredients: "Asafoetida, Ginger, Black pepper, Long pepper, Cumin",
                instructions: "Take with warm water before meals",
                recipe: "1/4 tsp powder with warm water",
                dosage: "Before meals",
                effectiveness: 4.4
            }
        },
        "Respiratory Health": {
            "Sitopaladi": {
                symptoms: ["Dry Cough", "Common Cold", "Sore Throat"],
                ingredients: "Mishri, Pippali, Cinnamon, Cardamom",
                instructions: "Take with honey",
                recipe: "1/4 tsp powder with honey",
                dosage: "Thrice daily",
                effectiveness: 4.4
            },
            "Tulsi": {
                symptoms: ["Common Cold", "Cough", "Nasal Congestion"],
                ingredients: "Tulsi leaves",
                instructions: "Make tea or take with honey",
                recipe: "2-3 leaves in hot water or with honey",
                dosage: "2-3 times daily",
                effectiveness: 4.3
            }
        },
        "Stress & Sleep": {
            "Ashwagandha": {
                symptoms: ["Stress", "Anxiety", "Sleep Issues", "Mental Fatigue"],
                ingredients: "Ashwagandha root powder",
                instructions: "Mix with warm milk and honey",
                recipe: "1/2 tsp powder with milk",
                dosage: "Twice daily",
                effectiveness: 4.7
            },
            "Brahmi": {
                symptoms: ["Mental Fatigue", "Stress", "Nervous Tension"],
                ingredients: "Brahmi powder",
                instructions: "Take with warm water or honey",
                recipe: "1/2 tsp powder with water/honey",
                dosage: "Twice daily",
                effectiveness: 4.5
            }
        },
        "Joint & Muscle": {
            "Turmeric": {
                symptoms: ["Joint Pain", "Inflammation", "Body Aches"],
                ingredients: "Turmeric powder, Black pepper",
                instructions: "Mix with warm milk",
                recipe: "1 tsp turmeric, pinch of black pepper in milk",
                dosage: "Twice daily",
                effectiveness: 4.6
            },
            "Guggulu": {
                symptoms: ["Joint Pain", "Inflammation", "Stiffness"],
                ingredients: "Purified Guggulu",
                instructions: "Take with warm water",
                recipe: "2 tablets",
                dosage: "Twice daily",
                effectiveness: 4.5
            }
        }
    };

    const findRemediesForSymptoms = (selectedSymptoms) => {
        const matchingRemedies = [];
        
        Object.entries(remedyMappings).forEach(([category, remedies]) => {
            Object.entries(remedies).forEach(([remedyName, remedyInfo]) => {
                const hasMatchingSymptoms = selectedSymptoms.some(symptom =>
                    remedyInfo.symptoms.includes(symptom)
                );
                
                if (hasMatchingSymptoms) {
                    matchingRemedies.push({
                        name: remedyName,
                        category: category,
                        ...remedyInfo
                    });
                }
            });
        });
        
        return matchingRemedies.sort((a, b) => b.effectiveness - a.effectiveness);
    };

    const handleSymptomToggle = (symptom) => {
        setSelectedSymptoms(prev => {
            if (prev.includes(symptom)) {
                return prev.filter(s => s !== symptom);
            } else {
                return [...prev, symptom];
            }
        });
    };

    const handleSubmit = async () => {
        if (selectedSymptoms.length === 0) {
            alert("Please select at least one symptom");
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            console.log('Sending symptoms to backend:', selectedSymptoms);
            const response = await api.post('/recommendations', {
                symptoms: selectedSymptoms
            });
            
            console.log('Backend response:', response.data);
            setRecommendations(response.data);
            
        } catch (err) {
            console.error('Detailed error:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status
            });
            setError(`Failed to get recommendations: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="symptom-checker">
            <h2>Select Your Symptoms</h2>
            <div className="symptoms-grid">
                {Object.entries(symptomCategories).map(([category, symptoms]) => (
                    <div key={category} className="category-section">
                        <h3 className="category-title">{category}</h3>
                        <div className="symptoms-list">
                            {symptoms.map((symptom) => (
                                <div 
                                    key={symptom} 
                                    className="symptom-item"
                                    onClick={() => handleSymptomToggle(symptom)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedSymptoms.includes(symptom)}
                                        onChange={() => {}}
                                    />
                                    <span>{symptom}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedSymptoms.length > 0 && (
                <div className="selected-symptoms">
                    <h3>Selected Symptoms:</h3>
                    <div className="selected-symptoms-list">
                        {selectedSymptoms.map((symptom) => (
                            <span key={symptom} className="symptom-tag">
                                {symptom}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <button 
                className="submit-button"
                onClick={handleSubmit}
                disabled={selectedSymptoms.length === 0 || isLoading}
            >
                {isLoading ? 'Getting Recommendations...' : 'Get Recommendations'}
            </button>

            {error && <div className="error-message">{error}</div>}
            
            {isLoading && (
                <div className="loader">
                    <div className="loader-spinner"></div>
                    <p>Analyzing your symptoms...</p>
                </div>
            )}

            {recommendations && (
                <div className="recommendations-section">
                    <h3>Recommended Remedies:</h3>
                    {recommendations.map((remedy, index) => (
                        <div key={index} className="remedy-card">
                            <h4>Remedy {index + 1}</h4>
                            <div className="remedy-details">
                                <p><strong>Herbs:</strong> {remedy.herbs.join(', ')}</p>
                                <p><strong>Ingredients:</strong> {remedy.ingredients}</p>
                                <p><strong>Instructions:</strong> {remedy.instructions}</p>
                                <p><strong>Recipe:</strong> {remedy.recipe}</p>
                                <p><strong>Dosage:</strong> {remedy.dosage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SymptomChecker;