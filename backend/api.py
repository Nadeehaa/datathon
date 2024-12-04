from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import json
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Mock data for demonstration - replace with real data
def create_mock_dataset():
    crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize']
    soil_types = ['clay', 'sandy', 'loamy', 'black']
    climates = ['tropical', 'subtropical', 'arid', 'temperate']
    water_levels = ['high', 'medium', 'low']
    
    data = []
    for _ in range(1000):
        soil = random.choice(soil_types)
        climate = random.choice(climates)
        water = random.choice(water_levels)
        crop = random.choice(crops)
        data.append([soil, climate, water, crop])
    
    return pd.DataFrame(data, columns=['soil_type', 'climate', 'water_availability', 'crop'])

def train_model():
    df = create_mock_dataset()
    
    # Convert categorical variables to numerical
    soil_type_map = {'clay': 0, 'sandy': 1, 'loamy': 2, 'black': 3}
    climate_map = {'tropical': 0, 'subtropical': 1, 'arid': 2, 'temperate': 3}
    water_map = {'high': 0, 'medium': 1, 'low': 2}
    
    X = df[['soil_type', 'climate', 'water_availability']].replace({
        'soil_type': soil_type_map,
        'climate': climate_map,
        'water_availability': water_map
    })
    y = df['crop']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    return model, soil_type_map, climate_map, water_map

def generate_market_trends(crop):
    years = list(range(2019, 2024))
    data = {}
    
    base_yield = random.uniform(2000, 5000)
    base_price = random.uniform(1000, 3000)
    
    for year in years:
        yield_value = base_yield * (1 + random.uniform(-0.2, 0.2))
        price = base_price * (1 + random.uniform(-0.15, 0.25))
        profit = yield_value * price
        
        data[str(year)] = {
            "yield": round(yield_value, 2),
            "price": round(price, 2),
            "profit": round(profit, 2)
        }
    
    return data

def get_weather_data():
    weather_types = ['Sunny', 'Partly Cloudy', 'Rainy', 'Overcast']
    forecast = []
    
    current_date = datetime.now()
    for i in range(7):
        date = current_date + timedelta(days=i)
        forecast.append({
            'date': date.strftime('%Y-%m-%d'),
            'condition': random.choice(weather_types),
            'temperature': round(random.uniform(20, 35), 1),
            'humidity': round(random.uniform(40, 90), 1),
            'rainfall_chance': round(random.uniform(0, 100), 1)
        })
    
    return forecast

def get_crop_tips(crop):
    tips_database = {
        'Rice': [
            'Maintain proper water level during cultivation',
            'Control weeds in early growth stages',
            'Monitor for pest infestations regularly',
            'Ensure proper drainage system'
        ],
        'Wheat': [
            'Sow at the right time based on variety',
            'Maintain proper spacing between rows',
            'Apply fertilizers as per soil test results',
            'Watch for rust disease symptoms'
        ],
        'Cotton': [
            'Ensure adequate sunlight exposure',
            'Monitor soil moisture regularly',
            'Watch for bollworm infestation',
            'Practice proper pruning techniques'
        ],
        'Sugarcane': [
            'Maintain proper irrigation schedule',
            'Remove dead leaves periodically',
            'Watch for stem borer infestation',
            'Practice trash mulching'
        ],
        'Maize': [
            'Ensure proper seed spacing',
            'Monitor nitrogen levels',
            'Watch for corn earworm',
            'Maintain soil moisture during tasseling'
        ]
    }
    return tips_database.get(crop, ['No specific tips available for this crop'])

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        model, soil_map, climate_map, water_map = train_model()
        
        # Prepare input data
        input_data = np.array([[
            soil_map[data['soilType']],
            climate_map[data['climate']],
            water_map[data['waterAvailability']]
        ]])
        
        # Get predictions and probabilities
        prediction = model.predict(input_data)
        probabilities = model.predict_proba(input_data)[0]
        
        # Get top 3 crops
        top_indices = np.argsort(probabilities)[-3:][::-1]
        top_crops = []
        
        for idx in top_indices:
            crop_name = model.classes_[idx]
            top_crops.append({
                'name': crop_name,
                'probability': round(float(probabilities[idx]) * 100, 2),
                'market_trends': {
                    'yearly_data': generate_market_trends(crop_name)
                },
                'tips': get_crop_tips(crop_name)
            })
        
        response = {
            'top_crops': top_crops,
            'weather_data': get_weather_data()
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) 