import os
import ast
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier

def safe_eval(value):
    """
    Safely evaluate a string representation of a list or other Python literal.
    
    Args:
        value (str): String to be evaluated
    
    Returns:
        list: List of cleaned strings
    """
    if not isinstance(value, str):
        return value
        
    # Remove any escaped characters and normalize quotes
    value = value.replace('\\', '').replace('\"', '"')
    
    try:
        # Try to evaluate as a Python literal
        result = ast.literal_eval(value)
        if isinstance(result, list):
            return [str(item).strip() for item in result]
        return [str(result).strip()]
    except (ValueError, SyntaxError):
        # If evaluation fails, try to split by quotes
        parts = [p.strip(' []"') for p in value.split('"') if p.strip(' []"')]
        if parts:
            return parts
        
        # If that fails, split by comma
        parts = [p.strip() for p in value.split(',') if p.strip()]
        if parts:
            return parts
            
        # If all else fails, return the cleaned string as a single item
        return [value.strip(' []"')] if value.strip(' []"') else []


class DataProcessor:
    """
    A utility class for preprocessing and cleaning data.
    """
    def preprocess_text(self, text):
        """
        Preprocess a single text string.
        
        Args:
            text (str): Text to preprocess
            
        Returns:
            str: Cleaned and preprocessed text
        """
        if pd.isna(text):
            return ""
        return str(text).strip().lower()

    def process_symptoms(self, symptoms):
        """
        Process symptoms to ensure they are in a standardized format.
        
        Args:
            symptoms (list or str): Symptoms to process
        
        Returns:
            list: Cleaned and processed symptoms
        """
        # Handle NaN values
        if isinstance(symptoms, (str, float)) and pd.isna(symptoms):
            return []
        
        # Convert single string to list
        if isinstance(symptoms, str):
            symptoms = [symptoms]
        
        # Process each symptom
        processed = []
        for symptom in symptoms:
            if pd.isna(symptom):
                continue
            cleaned = self.preprocess_text(symptom)
            if cleaned:  # Only add non-empty strings
                processed.append(cleaned)
        
        return processed

    def process_remedies(self, remedies):
        """
        Process remedies to ensure they are in a standardized format.
        
        Args:
            remedies (list or str): Remedies to process
        
        Returns:
            list: Cleaned and processed remedies
        """
        # Handle NaN values
        if isinstance(remedies, (str, float)) and pd.isna(remedies):
            return []
        
        # Convert single string to list
        if isinstance(remedies, str):
            remedies = [remedies]
        
        # Process each remedy
        processed = []
        for remedy in remedies:
            if pd.isna(remedy):
                continue
            cleaned = self.preprocess_text(remedy)
            if cleaned:  # Only add non-empty strings
                processed.append(cleaned)
        
        return processed


class HerbRecommender:
    def __init__(self, data_processor=None):
        self.model = None
        self.vectorizer = None
        self.data_processor = data_processor or DataProcessor()
        self.load_and_train_model()

    def load_and_train_model(self):
        current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        data_path = os.path.join(current_dir, 'data', 'herbal_remedies.csv')
        
        # Load and process dataset
        df = pd.read_csv(data_path)
        
        # Convert string representations to lists
        df['symptoms'] = df['symptoms'].apply(safe_eval)
        df['remedies'] = df['remedies'].apply(safe_eval)
        
        # Clean the data
        self.symptom_to_remedies = {}
        for idx, row in df.iterrows():
            symptoms = [s.strip().lower() for s in row['symptoms']]
            remedies = []
            if isinstance(row['remedies'], list) and len(row['remedies']) > 0:
                remedy_info = {
                    'herbs': row['remedies'],
                    'ingredients': row.get('ingredients', 'Not specified'),
                    'instructions': row.get('instructions', 'Not specified'),
                    'recipe': row.get('recipe', 'Not specified'),
                    'dosage': row.get('dosage', 'Not specified')
                }
                remedies = [remedy_info]
            
            # Store each symptom combination with its remedies
            symptom_key = tuple(sorted(symptoms))
            self.symptom_to_remedies[symptom_key] = remedies

    def predict(self, user_symptoms):
        """
        Predict remedies based on user symptoms.
        
        Args:
            user_symptoms (list): List of symptoms from user
        
        Returns:
            list: List of dictionaries containing detailed remedy information
        """
        # Clean user input
        cleaned_symptoms = [s.strip().lower() for s in user_symptoms]
        symptom_key = tuple(sorted(cleaned_symptoms))
        
        # Direct match
        if symptom_key in self.symptom_to_remedies:
            return self.symptom_to_remedies[symptom_key]
        
        # Partial match (if user provides subset of symptoms)
        recommended_remedies = []
        for known_symptoms, remedies in self.symptom_to_remedies.items():
            if all(symptom in known_symptoms for symptom in cleaned_symptoms):
                recommended_remedies.extend(remedies)
        
        return recommended_remedies

    def get_feature_names(self):
        """
        Return the list of valid symptoms used in the vectorizer.
        
        Returns:
            list: List of symptoms used as features
        """
        return list(self.vectorizer.vocabulary_.keys())
