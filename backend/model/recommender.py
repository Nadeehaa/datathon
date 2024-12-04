import os
import ast
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import traceback

try:
    from backend.scraper.herb_scraper import HerbScraper
except ImportError:
    from scraper.herb_scraper import HerbScraper

class HerbRecommender:
    def __init__(self):
        self.rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.mlb = MultiLabelBinarizer()
        self.remedy_info = {}
        self.all_symptoms = []
        self.feature_names = None
        self.herb_scraper = HerbScraper()
        
        # Define remedy mappings with your specific symptoms
        self.remedy_mappings = {
            'Energy_Wellness': {
                'Ashwagandha': {
                    'symptoms': ['low_energy', 'recovery_support', 'nervous_tension'],
                    'ingredients': 'Ashwagandha root powder',
                    'instructions': 'Mix with warm milk or water',
                    'recipe': '1/2 teaspoon with warm milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.8
                }
            },
            'Skin_Care': {
                'Neem': {
                    'symptoms': ['acne', 'skin_rashes', 'dry_skin'],
                    'ingredients': 'Neem powder or leaves',
                    'instructions': 'Make paste with water',
                    'recipe': 'As needed for application',
                    'dosage': 'Apply twice daily',
                    'effectiveness': 4.5
                }
            }
        }
        
        # Initialize feature space and prepare training data
        self._initialize_training_data()

    def _initialize_training_data(self):
        """Initialize and prepare training data"""
        # Initialize feature space with known symptoms
        self.all_symptoms = sorted(list(set(
            symptom for symptoms in self.symptom_categories.values() 
            for symptom in symptoms
        )))
        print(f"Initialized with {len(self.all_symptoms)} symptoms")
        
        # Prepare initial training data from categories
        training_data = []
        
        # Use the existing remedy_mappings instead of redefining them
        for category, remedies in self.remedy_mappings.items():
            for remedy_name, remedy_info in remedies.items():
                training_data.append({
                    'symptoms': str(remedy_info['symptoms']),
                    'remedies': str([remedy_name]),
                    'effectiveness_rating': remedy_info.get('effectiveness', 4.0),
                    'severity_level': 'Moderate',
                    'demographics': str(['Adult']),
                    'contraindications': str([]),
                    'season_suitable': str(['All Seasons']),
                    'ingredients': remedy_info['ingredients'],
                    'instructions': remedy_info['instructions'],
                    'recipe': remedy_info['recipe'],
                    'dosage': remedy_info['dosage']
                })
        
        # Convert to DataFrame and train model
        df = pd.DataFrame(training_data)
        self.train_random_forest(df)

    def train_random_forest(self, df):
        """Train the Random Forest model with the provided data"""
        print("\nLoading and training model...")
        
        try:
            # Create a copy of the dataframe to avoid warnings
            df = df.copy()
            
            # Convert string representations of lists to actual lists
            for col in ['symptoms', 'remedies', 'demographics', 'contraindications', 'season_suitable']:
                df[col] = df[col].apply(ast.literal_eval)
            
            # Update all_symptoms with training data
            for symptom_list in df['symptoms']:
                self.all_symptoms.extend(symptom_list)
            self.all_symptoms = sorted(list(set(self.all_symptoms)))
            print(f"Updated to {len(self.all_symptoms)} symptoms after training data")
            
            # Create feature vectors
            X = np.zeros((len(df), len(self.all_symptoms)))
            for i, symptom_list in enumerate(df['symptoms']):
                for symptom in symptom_list:
                    if symptom in self.all_symptoms:
                        j = self.all_symptoms.index(symptom)
                        X[i, j] = 1
                        
            # Get target values
            y = [r[0] for r in df['remedies']]
            
            # Store remedy information
            for idx, row in df.iterrows():
                remedy = row['remedies'][0]
                self.remedy_info[remedy] = {
                    'effectiveness_rating': row.get('effectiveness_rating', 4.0),
                    'severity_level': row.get('severity_level', 'Moderate'),
                    'demographics': row['demographics'],
                    'contraindications': row['contraindications'],
                    'season_suitable': row['season_suitable']
                }
            
            # Train the model
            self.rf_model.fit(X, y)
            print("Model training completed successfully!\n")
            
        except Exception as e:
            print(f"Error in train_random_forest: {str(e)}")
            raise

    def predict_remedies(self, symptoms, user_data=None):
        """Predict herbal remedies based on symptoms"""
        try:
            normalized_symptoms = [s.lower().replace(' ', '_') for s in symptoms]
            recommendations = []
            
            for category, remedies in self.remedy_mappings.items():
                for remedy_name, remedy_info in remedies.items():
                    remedy_symptoms = [s.lower().replace(' ', '_') for s in remedy_info['symptoms']]
                    matching_symptoms = [s for s in normalized_symptoms if s in remedy_symptoms]
                    
                    if matching_symptoms:
                        recommendations.append({
                            'herbs': [remedy_name],
                            'ingredients': remedy_info['ingredients'],
                            'instructions': remedy_info['instructions'],
                            'recipe': remedy_info['recipe'],
                            'dosage': remedy_info['dosage'],
                            'effectiveness': remedy_info.get('effectiveness', 0)
                        })
            
            recommendations.sort(key=lambda x: x['effectiveness'], reverse=True)
            return recommendations[:3] if recommendations else []
            
        except Exception as e:
            print(f"Error: {str(e)}")
            return []

    def save_model(self, path):
        """Save the model and all symptoms"""
        model_data = {
            'model': self.rf_model,
            'symptoms': self.all_symptoms,
            'remedy_info': self.remedy_info
        }
        joblib.dump(model_data, path)
        print(f"Model saved with {len(self.all_symptoms)} symptoms")

    def load_model(self, path):
        """Load the model and all symptoms"""
        model_data = joblib.load(path)
        self.rf_model = model_data['model']
        self.all_symptoms = model_data['symptoms']
        self.remedy_info = model_data['remedy_info']
        print(f"Model loaded with {len(self.all_symptoms)} symptoms")

    def _get_category(self, symptoms):
        """Determine the category based on symptoms"""
        max_matches = 0
        best_category = None
        
        for category, category_symptoms in self.symptom_categories.items():
            matches = sum(1 for s in symptoms if s in category_symptoms)
            if matches > max_matches:
                max_matches = matches
                best_category = category
                
        return best_category if max_matches > 0 else None

    def _calculate_relevance(self, remedy_info, symptoms, category):
        """Calculate relevance score for a remedy"""
        # Base score from effectiveness rating
        score = remedy_info['effectiveness_rating']
        
        # Adjust based on severity level
        severity_multiplier = {
            'Mild': 1.0,
            'Moderate': 1.2,
            'Severe': 1.4
        }
        score *= severity_multiplier.get(remedy_info['severity_level'], 1.0)
        
        return score

    def _check_constraints(self, remedy_info, user_data):
        """Check if remedy meets user constraints"""
        # Check demographics
        if 'age_group' in user_data and user_data['age_group'] not in remedy_info['demographics']:
            return False
            
        # Check contraindications
        if 'conditions' in user_data:
            for condition in user_data['conditions']:
                if condition in remedy_info['contraindications']:
                    return False
                    
        # Check seasonal suitability
        if 'season' in user_data and user_data['season'] not in remedy_info['season_suitable']:
            return False
            
        return True
