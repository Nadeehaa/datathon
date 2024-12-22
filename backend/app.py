from flask import Flask, request, jsonify
from ml_model import HerbalRecommendationSystem
from flask_cors import CORS
import traceback

app = Flask(__name__)
# Allow CORS from your frontend domain
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://your-frontend-domain.vercel.app",
            "http://localhost:3000"
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
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return "Herbal Recommendation API is running!"