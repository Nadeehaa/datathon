import React, { useState } from 'react';
import '../components/styles/main.css';

const SymptomChecker = ({ onSubmit }) => {
    const [symptoms, setSymptoms] = useState([]);
    const commonSymptoms = [
        'Fever', 'Headache', 'Cough', 'Fatigue',
        'Body Pain', 'Nausea', 'Dizziness', 'Sore Throat',
        'Congestion', 'Stomach Pain', 'Joint Pain', 'Anxiety',
        'Insomnia', 'Allergies', 'Skin Problems'
    ];

    const handleSymptomChange = (symptom) => {
        if (symptoms.includes(symptom)) {
            setSymptoms(symptoms.filter(s => s !== symptom));
        } else {
            setSymptoms([...symptoms, symptom]);
        }
    };

    return (
        <div className="symptom-checker">
            <h2>Select Your Symptoms</h2>
            <div className="symptoms-grid">
                {commonSymptoms.map(symptom => (
                    <label key={symptom} className="symptom-item">
                        <input
                            type="checkbox"
                            checked={symptoms.includes(symptom)}
                            onChange={() => handleSymptomChange(symptom)}
                        />
                        {symptom}
                    </label>
                ))}
            </div>
            <button 
                className="submit-button"
                onClick={() => onSubmit(symptoms)}
                disabled={symptoms.length === 0}
            >
                Get Recommendations
            </button>
        </div>
    );
};

export default SymptomChecker; 