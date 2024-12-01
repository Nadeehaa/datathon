from flask import Flask
from flask_cors import CORS
from .api.routes import api_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(api_bp)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
