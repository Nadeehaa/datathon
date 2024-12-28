from flask import Flask, request, jsonify, send_from_directory
from ml_model import HerbalRecommendationSystem
from flask_cors import CORS
import traceback
import os

app = Flask(__name__, static_folder='static')
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "https://your-frontend-name.onrender.com"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Initialize the herbal recommendation system
herbal_system = HerbalRecommendationSystem()

# API routes
@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        recommendations = herbal_system.get_recommendations(symptoms)
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({
            "error": str(e), 
            "traceback": traceback.format_exc()
        }), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)