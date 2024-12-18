import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import './styles/SymptomForm.css';

const SymptomForm = ({ loading }) => {
    const [availableSymptoms, setAvailableSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSymptoms = async () => {
            try {
                const symptoms = await api.getSymptoms();
                setAvailableSymptoms(symptoms);
            } catch (err) {
                setError('Failed to load symptoms');
                console.error(err);
            }
        };

        loadSymptoms();
    }, []);

    const handleSymptomSelect = (symptom) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedSymptoms.length === 0) {
            setError('Please select at least one symptom.');
            return;
        }

        try {
            setError(null);
            const data = await api.getRecommendations(selectedSymptoms);
            setRecommendations(data.recommendations);
        } catch (err) {
            setError('Failed to fetch recommendations.');
            console.error(err);
        }
    };

    return (
        <div className="symptom-form-container">
            <h2>Select Your Symptoms</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="symptom-form">
                <div className="symptoms-grid">
                    {availableSymptoms.map((symptom) => (
                        <div
                            key={symptom}
                            className={`symptom-chip ${selectedSymptoms.includes(symptom) ? 'selected' : ''}`}
                            onClick={() => handleSymptomSelect(symptom)}
                        >
                            {symptom}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading || selectedSymptoms.length === 0}
                >
                    {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
                </button>
            </form>

            {recommendations.length > 0 && (
                <div className="recommendations">
                    <h3>Recommendations:</h3>
                    <ul>
                        {recommendations.map((rec, index) => (
                            <li key={index}>
                                <p><strong>Herbs:</strong> {rec.herbs.join(', ')}</p>
                                <p><strong>Ingredients:</strong> {rec.ingredients}</p>
                                <p><strong>Instructions:</strong> {rec.instructions}</p>
                                <p><strong>Recipe:</strong> {rec.recipe}</p>
                                <p><strong>Dosage:</strong> {rec.dosage}</p>
                                <p><strong>Confidence:</strong> {rec.confidence}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SymptomForm;
