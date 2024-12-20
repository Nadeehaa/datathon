import pandas as pd
import numpy as np
import os
import random
import requests
from bs4 import BeautifulSoup
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

def load_symptoms_from_csv():
    """
    Load symptoms data from CSV file
    Returns a list of symptom groups
    """
    try:
        # Read the CSV file
        df = pd.read_csv('data/herbal_remedies.csv')
        
        # Assuming the CSV has columns for symptoms
        symptoms_list = []
        
        # Process the DataFrame to extract symptoms
        for _, row in df.iterrows():
            symptoms = [symptom for symptom in row if pd.notna(symptom)]
            if symptoms:
                symptoms_list.append(symptoms)
        
        return symptoms_list
    
    except FileNotFoundError:
        print("Error: herbal_remedies.csv file not found")
        return []
    except Exception as e:
        print(f"Error loading CSV file: {str(e)}")
        return []

class HerbalRecommendationSystem:
    def __init__(self, debug=True):
        self.debug = debug
        self.log("Initializing HerbalRecommendationSystem...")
        
        # Ensure data directory exists
        os.makedirs('data', exist_ok=True)
        
        # Load herbs data
        self.herbs_data = self.load_herbs_data()
        
        # Validate data
        if len(self.herbs_data) == 0:
            self.log("No herbal data found. System cannot function.")
            return

        # Prepare data for modeling
        self.prepare_data()

    def log(self, message):
        """Logging method for debugging"""
        if self.debug:
            print(message)

    def load_herbs_data(self):
        """
        Load herbal data from CSV or scrape from the web if no CSV exists
        """
        try:
            file_path = 'data/herbal_remedies.csv'
            if os.path.exists(file_path):
                df = pd.read_csv(file_path, on_bad_lines='skip')
                self.log(f"Loaded data from CSV: {file_path}")
            else:
                self.log("No CSV found. Scraping data from website...")
                df = self.scrape_herbal_data("https://www.herbmed.org/herb-list/")
            
            self.log(f"Loaded columns: {list(df.columns)}")
            df['training_text'] = df['symptoms'] + ' ' + df['remedies']
            return df
        except Exception as e:
            self.log(f"Error loading data: {e}")
            return pd.DataFrame()

    def scrape_herbal_data(self, url):
        """
        Scrape herbal data from a website (Example placeholder)
        """
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        data = {
            'symptoms': [],
            'remedies': [],
            'ingredients': [],
            'instructions': [],
            'recipe': [],
            'dosage': []
        }
        for remedy_section in soup.find_all('div', class_='remedy'):
            symptoms = remedy_section.find('ul', class_='symptoms').text.split(", ")
            remedies = remedy_section.find('span', class_='remedy-name').text
            ingredients = remedy_section.find('div', class_='ingredients').text
            instructions = remedy_section.find('div', class_='instructions').text
            recipe = remedy_section.find('div', class_='recipe').text
            dosage = remedy_section.find('div', class_='dosage').text
            data['symptoms'].append(symptoms)
            data['remedies'].append(remedies)
            data['ingredients'].append(ingredients)
            data['instructions'].append(instructions)
            data['recipe'].append(recipe)
            data['dosage'].append(dosage)
        return pd.DataFrame(data)

    def prepare_data(self):
        """
        Prepare data for modeling
        """
        self.herbs_data = self.herbs_data[self.herbs_data['training_text'].notna()]
        self.herbs_data = self.herbs_data[self.herbs_data['training_text'].str.strip() != '']
        self.label_encoder = LabelEncoder()
        self.herbs_data['herb_encoded'] = self.label_encoder.fit_transform(self.herbs_data['remedies'])
        self.vectorizer = TfidfVectorizer(stop_words='english', max_features=1000, ngram_range=(1,2))
        self.X = self.vectorizer.fit_transform(self.herbs_data['training_text'])
        self.y = self.herbs_data['herb_encoded']
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        if len(self.y) > 0:
            self.model.fit(self.X, self.y)
            self.log(f"Model trained on {len(self.y)} samples")
        else:
            self.log("Insufficient data for training")

    def get_recommendations(self, symptoms):
        """
        Generate herb recommendations based on symptoms
        """
        try:
            if not hasattr(self, 'model') or self.model is None:
                self.log("Model not initialized")
                return []
            symptoms_text = ' '.join(symptoms)
            X_symptoms = self.vectorizer.transform([symptoms_text])
            probas = self.model.predict_proba(X_symptoms)[0]
            top_indices = np.argsort(probas)[-3:][::-1]
            recommendations = []
            for idx in top_indices:
                if probas[idx] > 0.1:
                    herb_name = self.label_encoder.inverse_transform([idx])[0]
                    herb_details = self.herbs_data[self.herbs_data['remedies'] == herb_name].iloc[0]
                    recommendation = {
                        'herbs': [herb_name],
                        'ingredients': herb_details['ingredients'],
                        'instructions': herb_details['instructions'],
                        'recipe': herb_details['recipe'],
                        'dosage': herb_details['dosage'],
                        'confidence': float(probas[idx])
                    }
                    recommendations.append(recommendation)
            return recommendations
        except Exception as e:
            self.log(f"Recommendation error: {e}")
            return []

    def generate_random_recipe(self):
        """
        Generate a random herb recipe from the dataset
        """
        random_index = np.random.choice(self.herbs_data.index)
        random_herb = self.herbs_data.iloc[random_index]
        recipe = {
            'herb': random_herb['remedies'],
            'ingredients': random_herb['ingredients'],
            'instructions': random_herb['instructions'],
            'dosage': random_herb['dosage'],
        }
        return recipe

def main():
    print("Starting the Herbal Recommendation System...")
    herbal_system = HerbalRecommendationSystem(debug=True)
    symptoms_list = load_symptoms_from_csv()
    for symptoms in symptoms_list:
        print(f"\nRecommendations for symptoms: {symptoms}")
        recommendations = herbal_system.get_recommendations(symptoms)
        for rec in recommendations:
            print("\nRecommendation:")
            for key, value in rec.items():
                print(f"{key.capitalize()}: {value}")
    random_recipe = herbal_system.generate_random_recipe()
    print("\nRandom Recipe:")
    for key, value in random_recipe.items():
        print(f"{key.capitalize()}: {value}")

if __name__ == "__main__":
    main()
