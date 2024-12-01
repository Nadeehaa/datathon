from flask import Blueprint, request, jsonify
from ..model.recommender import HerbRecommender
from ..model.validator import SymptomValidator
from ..scraper.herb_scraper import HerbScraper

api_bp = Blueprint('api', __name__)

# Initialize components
recommender = HerbRecommender()
symptom_validator = SymptomValidator(recommender)
herb_scraper = HerbScraper()

@api_bp.route('/get_recommendation', methods=['POST'])
def get_recommendation():
    try:
        # Parse request data
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        
        # Validate symptoms
        validation_result = symptom_validator.validate_symptoms(symptoms)
        if not validation_result["valid"]:
            return jsonify({
                'success': False,
                'error': 'Invalid symptoms',
                'invalid_symptoms': validation_result["invalid_symptoms"]
            }), 400
        
        # Predict recommendations
        recommendations = recommender.predict(validation_result["valid_symptoms"])
        
        # Get details for each herb
        detailed_recommendations = []
        for herb in recommendations:
            try:
                herb_info = herb_scraper.get_herb_details(herb)
                detailed_recommendations.append({
                    'herb': herb,
                    'details': herb_info
                })
            except Exception as scraper_error:
                # Log error and proceed with partial data
                detailed_recommendations.append({
                    'herb': herb,
                    'details': f"Error fetching details: {str(scraper_error)}"
                })
        
        return jsonify({
            'success': True,
            'recommendations': detailed_recommendations
        })
    
    except Exception as e:
        # Log unexpected errors
        return jsonify({
            'success': False,
            'error': 'Internal server error',
            'details': str(e)
        }), 500
