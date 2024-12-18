export const symptoms = {
    digestive: {
        title: "Digestive Issues",
        symptoms: [
            'Indigestion',
            'Bloating',
            'Gas',
            'Constipation',
            'Loss of Appetite'
        ]
    },
    respiratory: {
        title: "Respiratory Issues",
        symptoms: [
            'Dry Cough',
            'Common Cold',
            'Sore Throat',
            'Nasal Congestion'
        ]
    },
    commonAilments: {
        title: "Common Ailments",
        symptoms: [
            'Headache',
            'Mild Fever',
            'Body Pain',
            'Fatigue',
            'Sleep Issues'
        ]
    },
    skin: {
        title: "Skin Issues",
        symptoms: [
            'Acne',
            'Dry Skin',
            'Minor Rashes',
            'Itching'
        ]
    },
    stress: {
        title: "Stress & Mood",
        symptoms: [
            'Mild Anxiety',
            'Stress',
            'Mood Swings',
            'Mental Fatigue'
        ]
    },
    immunity: {
        title: "Immunity",
        symptoms: [
            'Weak Immunity',
            'Seasonal Allergies',
            'Frequent Cold'
        ]
    }
};

export const getAllSymptoms = () => {
    return Object.values(symptoms)
        .flatMap(category => category.symptoms)
        .sort();
};

export const getSymptomsByCategory = (category) => {
    return symptoms[category]?.symptoms || [];
};

export const getCategoryTitle = (category) => {
    return symptoms[category]?.title || '';
}; 