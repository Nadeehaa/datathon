from flask import Flask, request, jsonify
from ml_model import HerbalRecommendationSystem
from flask_cors import CORS
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# CORS Configuration
FRONTEND_URLS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ecoayur.vercel.app"
]

CORS(app, 
    resources={r"/*": {
        "origins": FRONTEND_URLS,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }})

# Initialize the herbal recommendation system
try:
    logger.info("Initializing HerbalRecommendationSystem...")
    herbal_system = HerbalRecommendationSystem()
    logger.info("HerbalRecommendationSystem initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize HerbalRecommendationSystem: {str(e)}")
    herbal_system = None

@app.route('/', methods=['GET'])
def root():
    return jsonify({
        "message": "Welcome to EcoAyur API",
        "status": "operational",
        "version": "1.0.0",
        "endpoints": {
            "health_check": "/api/health",
            "recommendations": "/api/recommend",
            "random_recipe": "/api/random-recipe"
        }
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "model_status": "initialized" if herbal_system is not None else "not initialized"
    })

@app.route('/api/recommend', methods=['POST'])
def get_recommendations():
    try:
        if not request.is_json:
            return jsonify({
                "success": False,
                "error": "Request must be JSON"
            }), 400

        data = request.get_json()
        symptoms = data.get('symptoms', [])

        if not symptoms:
            return jsonify({
                "success": False,
                "error": "No symptoms provided"
            }), 400

        recommendations = herbal_system.get_recommendations(symptoms)
        
        if not recommendations:
            logger.warning(f"No recommendations found for symptoms: {symptoms}")

        return jsonify({
            "success": True,
            "recommendations": recommendations
        })

    except Exception as e:
        logger.error(f"Error in get_recommendations: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/random-recipe', methods=['GET'])
def get_random_recipe():
    try:
        recipe = herbal_system.generate_random_recipe()
        if recipe:
            return jsonify({
                "success": True,
                "recipe": recipe
            })
        else:
            return jsonify({
                "success": False,
                "error": "Could not generate recipe"
            }), 500
    except Exception as e:
        logger.error(f"Error in get_random_recipe: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)