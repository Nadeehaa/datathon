from flask import Flask, request, jsonify
from ml_model import HerbalRecommendationSystem
from flask_cors import CORS
import traceback
import os

app = Flask(__name__)

# Allow CORS from your frontend domain
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://ecoayur-frontend.onrender.com",
            "http://localhost:5173",  # For local development
        ]
    }
})

# Initialize the herbal recommendation system
herbal_system = HerbalRecommendationSystem()

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        
        # Get recommendations from the ML model
        recommendations = herbal_system.get_recommendations(symptoms)
        
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({
            "error": str(e), 
            "traceback": traceback.format_exc()
        }), 500

@app.route('/', methods=['GET'])
def home():
    return "Herbal Recommendation API is running!"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)