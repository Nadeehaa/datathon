from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Update CORS configuration
CORS(app, 
     resources={r"/*": {
         "origins": ["http://localhost:5173"],
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization"],
         "supports_credentials": True
     }})

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        print("Received symptoms:", symptoms)  # Debug print
        
        # Your recommendation logic here
        # For now, let's return a test response
        recommendations = [
            {
                "herbs": ["Tulsi", "Ginger"],
                "ingredients": "Tulsi leaves, Ginger root",
                "instructions": "Boil in water for 5 minutes",
                "recipe": "1 cup water, 2-3 tulsi leaves, 1 inch ginger",
                "dosage": "Twice daily"
            }
        ]
        
        return jsonify(recommendations)
    
    except Exception as e:
        print("Error:", str(e))  # Debug print
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
