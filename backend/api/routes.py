from flask import Blueprint, request, jsonify
from ..model.recommender import HerbRecommender
from ..model.validator import SymptomValidator
from ..scraper.herb_scraper import HerbScraper
from datetime import datetime

api_bp = Blueprint('api', __name__)

# Initialize components
recommender = HerbRecommender()
symptom_validator = SymptomValidator(recommender)
herb_scraper = HerbScraper()

@api_bp.route('/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        
        print("\n=== API Request ===")
        print("Received symptoms:", symptoms)
        
        # Verify recommender is properly initialized
        print("\n=== Recommender Status ===")
        print("Has remedy_mappings:", hasattr(recommender, 'remedy_mappings'))
        if hasattr(recommender, 'remedy_mappings'):
            print("Number of categories:", len(recommender.remedy_mappings))
            print("Available categories:", list(recommender.remedy_mappings.keys()))
        
        # Get recommendations
        recommendations = recommender.predict_remedies(symptoms)
        
        print("\n=== API Response ===")
        print("Sending recommendations:", recommendations)
        
        if not recommendations:
            # Return a default response if no recommendations found
            return jsonify([{
                "herbs": ["No specific recommendation found"],
                "ingredients": "Please consult with an Ayurvedic practitioner",
                "instructions": "N/A",
                "recipe": "N/A",
                "dosage": "N/A"
            }])
        
        return jsonify(recommendations)
        
    except Exception as e:
        print("Error in get_recommendations:", str(e))
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
