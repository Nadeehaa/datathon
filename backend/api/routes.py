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

def get_current_season():
    """
    Determine the current season based on the month.
    Returns: str - Current season (Spring, Summer, Monsoon, Autumn, Winter)
    """
    month = datetime.now().month
    
    if month in [3, 4, 5]:
        return "Spring"
    elif month in [6, 7]:
        return "Summer"
    elif month in [8, 9]:
        return "Monsoon"
    elif month in [10, 11]:
        return "Autumn"
    else:  # month in [12, 1, 2]
        return "Winter"

@api_bp.route('/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        
        # Get additional user data
        user_data = {
            'age_group': data.get('age_group', 'adult'),
            'gender': data.get('gender'),
            'medications': data.get('medications', []),
            'severity': data.get('severity', 'mild'),
            'season': data.get('season', get_current_season())
        }
        
        # Validate symptoms
        validation_result = symptom_validator.validate_symptoms(symptoms)
        if not validation_result["valid"]:
            return jsonify({
                'success': False,
                'error': 'Invalid symptoms',
                'invalid_symptoms': validation_result["invalid_symptoms"]
            }), 400
        
        # Get personalized recommendations
        recommendations = recommender.predict(
            validation_result["valid_symptoms"],
            user_data=user_data
        )
        
        return jsonify({
            'success': True,
            'recommendations': recommendations
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
