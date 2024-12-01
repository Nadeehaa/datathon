import React, { useState } from 'react';
import RecommendationResults from './RecommendationResults';
import axios from 'axios';
import './styles/main.css';

const SymptomChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [recommendations, setRecommendations] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const symptomCategories = {
        "Digestive Health": [
            "Acid Reflux",
            "Bloating",
            "Gas",
            "Constipation",
            "Diarrhea",
            "Indigestion",
            "Nausea",
            "Stomach Pain",
            "Poor Digestion",
            "Loss of Appetite"
        ],
        "Immune Support": [
            "Weak Immunity",
            "Frequent Infections",
            "Mild Fever",
            "Fatigue",
            "Low Energy",
            "Seasonal Illness",
            "Recovery Support"
        ],
        "Men's Health": [
            "Prostate Health",
            "Male Vitality",
            "Male Fertility",
            "Male Hormonal Balance",
            "Stamina Issues",
            "Reproductive Health"
        ],
        "Metabolic Health": [
            "Blood Sugar Balance",
            "Weight Management",
            "Metabolism Issues",
            "Thyroid Support",
            "Cholesterol Balance",
            "Liver Support"
        ],
        "Pain Management": [
            "Headache",
            "Muscle Pain",
            "Joint Pain",
            "Back Pain",
            "Menstrual Cramps",
            "Arthritis Discomfort",
            "Body Aches",
            "Neck Tension"
        ],
        "Respiratory Health": [
            "Common Cold",
            "Dry Cough",
            "Wet Cough",
            "Sore Throat",
            "Nasal Congestion",
            "Sinus Issues",
            "Seasonal Allergies",
            "Bronchial Congestion"
        ],
        "Skin Care": [
            "Acne",
            "Dry Skin",
            "Eczema",
            "Skin Rashes",
            "Minor Cuts",
            "Skin Allergies",
            "Itching",
            "Minor Burns"
        ],
        "Stress & Sleep": [
            "Mild Anxiety",
            "Stress",
            "Insomnia",
            "Restlessness",
            "Sleep Issues",
            "Mental Fatigue",
            "Mood Swings",
            "Nervous Tension"
        ],
        "Teen Health": [
            "Teenage Acne",
            "Growing Pains",
            "Study Stress",
            "Concentration Issues",
            "Puberty Support",
            "Mood Management",
            "Teenage Sleep Issues"
        ],
        "Women's Health": [
            "Menstrual Irregularities",
            "PMS Symptoms",
            "Menopause Symptoms",
            "Hormonal Imbalance",
            "Vaginal Infections",
            "Breast Tenderness",
            "Fertility Support"
        ]
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
            // Temporary mock data for testing
            const mockResponse = {
                recommendations: {
                    herbs: ["Ashwagandha", "Turmeric", "Tulsi"],
                    confidence: [95, 85, 75]
                },
                herbal_details: {
                    "Ashwagandha": {
                        names: {
                            hindi: "अश्वगंधा",
                            telugu: "అశ్వగంధ"
                        },
                        description: "Ashwagandha is an ancient medicinal herb. It's classified as an adaptogen, meaning that it can help your body manage stress.",
                        preparation: "Can be taken as powder mixed with warm milk and honey",
                        uses: [
                            "Reduces stress and anxiety",
                            "Improves strength and stamina",
                            "Enhances concentration"
                        ],
                        dosage: "300-500mg twice daily",
                        precautions: "Consult physician if pregnant or breastfeeding",
                        image: "/herbs/ashwagandha.jpg"
                    },
                    "Turmeric": {
                        names: {
                            hindi: "हल्दी",
                            telugu: "పసుపు"
                        },
                        description: "Turmeric is a spice that contains curcumin, a substance with powerful anti-inflammatory properties.",
                        preparation: "Can be consumed with warm milk or added to food",
                        uses: [
                            "Reduces inflammation",
                            "Improves joint health",
                            "Boosts immunity"
                        ],
                        dosage: "500-2000mg per day",
                        precautions: "May interact with blood thinners",
                        image: "/herbs/turmeric.jpg"
                    },
                    "Tulsi": {
                        names: {
                            hindi: "तुलसी",
                            telugu: "తులసి"
                        },
                        description: "Holy Basil (Tulsi) is a sacred plant in Ayurvedic medicine known for its healing properties.",
                        preparation: "Can be consumed as tea or chewed fresh",
                        uses: [
                            "Reduces stress",
                            "Improves respiratory health",
                            "Boosts immunity"
                        ],
                        dosage: "2-3 cups of tea daily",
                        precautions: "May affect fertility, avoid during pregnancy",
                        image: "/herbs/tulsi.jpg"
                    }
                }
            };

            // Use this mock data instead of API call for now
            setRecommendations(mockResponse);
            
            // When API is ready, uncomment this:
            /*
            const response = await axios.post('http://localhost:5001/api/analyze-symptoms', {
                symptoms: selectedSymptoms
            });
            setRecommendations(response.data);
            */
            
        } catch (err) {
            setError('Failed to get recommendations. Please try again.');
            console.error('Error:', err);
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

            {recommendations && <RecommendationResults data={recommendations} />}
        </div>
    );
};

export default SymptomChecker;