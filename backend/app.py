from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import logging
import os
from ml_model import HerbalRecommendationSystem

# Initialize the Flask app and CORS
app = Flask(__name__, static_folder='static')
CORS(app, resources={
    r"/*": {
        "origins": os.environ.get('ALLOWED_ORIGINS', "http://localhost:5173").split(","),
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')

# Initialize the herbal recommendation system
try:
    herbal_system = HerbalRecommendationSystem()
    logging.info("Herbal Recommendation System initialized successfully.")
except Exception as e:
    logging.error("Failed to initialize Herbal Recommendation System: %s", e)
    herbal_system = None

# API endpoints
@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        if not isinstance(data, dict) or 'symptoms' not in data:
            return jsonify({"error": "Invalid request format. Expected JSON with 'symptoms' key."}), 400

        symptoms = data.get('symptoms', [])
        if not isinstance(symptoms, list):
            return jsonify({"error": "Invalid 'symptoms' format. Expected a list."}), 400

        recommendations = herbal_system.get_recommendations(symptoms)
        return jsonify({"recommendations": recommendations}), 200
    except Exception as e:
        logging.error("Error in /recommend endpoint: %s", e)
        return jsonify({
            "error": "An unexpected error occurred.",
            "traceback": traceback.format_exc() if app.debug else "Disabled in production"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Check if the herbal recommendation system is initialized
        if herbal_system is None:
            raise RuntimeError("Herbal Recommendation System is not initialized.")
        # Optionally add other checks, such as database or service connectivity
        return jsonify({"status": "healthy"}), 200
    except Exception as e:
        logging.error("Health check failed: %s", e)
        return jsonify({"status": "unhealthy", "error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=bool(os.environ.get('DEBUG', False)))
