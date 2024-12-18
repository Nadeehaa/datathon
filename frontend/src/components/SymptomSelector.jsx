import React from 'react';

const SymptomSelector = ({ selectedSymptoms, onSymptomSelect }) => {
    const symptomOptions = [
        { value: 'fever', label: 'Fever' },
        { value: 'cough', label: 'Cough' },
        { value: 'cold', label: 'Cold' },
        { value: 'fatigue', label: 'Fatigue' },
        { value: 'stress', label: 'Stress' },
        { value: 'anxiety', label: 'Anxiety' },
        { value: 'indigestion', label: 'Indigestion' },
        { value: 'nausea', label: 'Nausea' },
    ];

    const handleCheckboxChange = (symptom) => {
        const updatedSymptoms = selectedSymptoms.includes(symptom)
            ? selectedSymptoms.filter(s => s !== symptom)
            : [...selectedSymptoms, symptom];
        onSymptomSelect(updatedSymptoms);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {symptomOptions.map((option) => (
                <div key={option.value} className="form-control">
                    <label className="label cursor-pointer">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={selectedSymptoms.includes(option.value)}
                            onChange={() => handleCheckboxChange(option.value)}
                        />
                        <span className="label-text ml-2">{option.label}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default SymptomSelector; 