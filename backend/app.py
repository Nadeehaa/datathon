from flask import Flask, request, jsonify
from ml_model import HerbalRecommendationSystem  # Import ML model class
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Initialize the herbal recommendation system (ML model)
herbal_system = HerbalRecommendationSystem()

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()  # Get symptoms from frontend
        symptoms = data.get('symptoms', [])
        
        # Call the ML model to get recommendations
        recommendations = herbal_system.get_recommendations(symptoms)
        
        return jsonify(recommendations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
