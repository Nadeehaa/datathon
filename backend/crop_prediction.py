from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

app = Flask(__name__)
CORS(app)

# Load and prepare your dataset
def prepare_data():
    data = {
        'soil_type': ['clay', 'sandy', 'loamy', 'black'] * 25,
        'climate': ['tropical', 'subtropical', 'arid', 'temperate'] * 25,
        'water_availability': ['high', 'medium', 'low'] * 33 + ['high'],
        'crop': ['rice', 'wheat', 'corn', 'cotton', 'sugarcane'] * 20
    }
    df = pd.DataFrame(data)
    
    # Convert categorical variables to numerical
    df['soil_type'] = pd.Categorical(df['soil_type']).codes
    df['climate'] = pd.Categorical(df['climate']).codes
    df['water_availability'] = pd.Categorical(df['water_availability']).codes
    
    return df

# Train the model
def train_model(df):
    X = df[['soil_type', 'climate', 'water_availability']]
    y = df['crop']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    return model

# Generate market trends
def generate_market_trends(crop):
    years = list(range(2018, 2024))
    return {
        'yearly_data': {
            str(year): {
                'yield': np.random.randint(20, 50),
                'profit': np.random.randint(50000, 150000),
                'market_price': np.random.randint(1000, 5000)
            } for year in years
        },
        'current_trend': np.random.choice(['rising', 'stable', 'falling']),
        'forecast': np.random.choice(['positive', 'neutral', 'negative'])
    }

# Get weather data
def get_weather_data():
    return {
        'temperature': {
            'current': np.random.randint(20, 35),
            'forecast': [np.random.randint(20, 35) for _ in range(7)]
        },
        'rainfall': {
            'current': np.random.randint(50, 150),
            'forecast': [np.random.randint(50, 150) for _ in range(7)]
        },
        'humidity': {
            'current': np.random.randint(40, 80),
            'forecast': [np.random.randint(40, 80) for _ in range(7)]
        }
    }

# Get crop tips
def get_crop_tips(crop):
    tips_database = {
        'rice': [
            'Maintain proper water level throughout growing season',
            'Control weeds in early stages',
            'Monitor for pests, especially stem borers',
            'Ensure proper fertilization schedule',
            'Time harvesting when 80% of grains are mature'
        ],
        'wheat': [
            'Ensure proper drainage in the field',
            'Time the harvest when grains are hard',
            'Watch for rust diseases',
            'Apply balanced fertilization',
            'Maintain optimal row spacing'
        ],
        'corn': [
            'Regular fertilization is crucial',
            'Maintain adequate plant spacing',
            'Ensure proper irrigation during tasseling',
            'Control weeds in early stages',
            'Monitor for corn borer infestation'
        ],
        'cotton': [
            'Control insects early in the season',
            'Maintain proper plant spacing',
            'Time defoliation properly',
            'Monitor soil moisture regularly',
            'Practice proper harvesting techniques'
        ],
        'sugarcane': [
            'Deep plowing is essential',
            'Maintain proper irrigation schedule',
            'Practice effective weed management',
            'Monitor for stem borer infestation',
            'Time harvesting at proper maturity'
        ]
    }
    return tips_database.get(crop, ['No specific tips available for this crop'])

# Initialize data and model
df = prepare_data()
model = train_model(df)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Convert input to numerical values
        soil_type_map = {'clay': 0, 'sandy': 1, 'loamy': 2, 'black': 3}
        climate_map = {'tropical': 0, 'subtropical': 1, 'arid': 2, 'temperate': 3}
        water_map = {'high': 0, 'medium': 1, 'low': 2}
        
        input_data = np.array([[
            soil_type_map[data['soilType']],
            climate_map[data['climate']],
            water_map[data['waterAvailability']]
        ]])
        
        # Get predictions and probabilities
        prediction = model.predict(input_data)
        probabilities = model.predict_proba(input_data)[0]
        
        # Get top 3 crops
        top_3_indices = np.argsort(probabilities)[-3:][::-1]
        top_3_crops = [model.classes_[i] for i in top_3_indices]
        top_3_probs = [probabilities[i] for i in top_3_indices]
        
        # Prepare response
        response = {
            'top_crops': [
                {
                    'name': crop,
                    'probability': round(prob * 100, 2),
                    'market_trends': generate_market_trends(crop),
                    'tips': get_crop_tips(crop)
                }
                for crop, prob in zip(top_3_crops, top_3_probs)
            ],
            'weather_data': get_weather_data()
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) 