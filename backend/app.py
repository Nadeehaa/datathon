from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from models.symptom_analyzer import SymptomAnalyzer
from utils.web_scraper import HerbalMedicineScraper

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/api/analyze-symptoms', methods=['POST'])
def analyze_symptoms():
    try:
        symptoms = request.json.get('symptoms', [])
        print(f"Received symptoms: {symptoms}")

        # Initialize analyzers
        analyzer = SymptomAnalyzer()
        scraper = HerbalMedicineScraper()

        # Get initial recommendations
        recommendations = analyzer.get_recommendations(symptoms)
        print(f"Generated recommendations: {recommendations}")

        # Get detailed herbal information
        herbal_info = scraper.get_herbal_info(recommendations['herbs'])
        print(f"Retrieved herbal info for: {recommendations['herbs']}")

        # Enhance recommendations with symptom-specific details
        enhanced_response = {
            'recommendations': {
                'herbs': recommendations['herbs'],
                'confidence_score': recommendations['confidence_score'],
                'symptom_matches': recommendations.get('symptom_matches', {})
            },
            'herbal_details': {}
        }

        # Add detailed information for each herb
        for herb in recommendations['herbs']:
            herb_info = herbal_info.get(herb, {})
            herb_details = analyzer.get_herb_details(herb)
            
            enhanced_response['herbal_details'][herb] = {
                'description': herb_info.get('description', ''),
                'benefits': herb_info.get('benefits', []),
                'scientific_name': herb_info.get('scientific_name', ''),
                'preparations': herb_info.get('preparations', {}),
                'primary_uses': herb_details.get('primary_uses', []),
                'matched_symptoms': recommendations.get('symptom_matches', {}).get(herb, [])
            }

        print("Sending enhanced response with detailed recommendations")
        return jsonify(enhanced_response)

    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({
            'error': 'An error occurred while processing your request',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
