from flask import Flask, request, jsonify, send_from_directory
from ml_model import HerbalRecommendationSystem
from flask_cors import CORS
import traceback
import os

app = Flask(__name__, static_folder='static')
CORS(app)

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

# Serve frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)