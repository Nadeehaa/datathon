import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity

class SymptomAnalyzer:
    def __init__(self):
        # Load pre-defined symptom-herb relationships
        self.herb_data = {
            'Fever': ['Tulsi', 'Ginger', 'Neem'],
            'Headache': ['Peppermint', 'Lavender', 'Feverfew'],
            'Cough': ['Tulsi', 'Licorice', 'Thyme'],
            'Fatigue': ['Ashwagandha', 'Ginseng', 'Rhodiola'],
            'Body Pain': ['Turmeric', 'Ginger', 'Boswellia'],
            'Nausea': ['Ginger', 'Peppermint', 'Chamomile'],
            'Dizziness': ['Ginger', 'Ginkgo Biloba', 'Peppermint'],
            'Sore Throat': ['Tulsi', 'Licorice', 'Marshmallow Root'],
            'Congestion': ['Eucalyptus', 'Peppermint', 'Thyme'],
            'Stomach Pain': ['Peppermint', 'Ginger', 'Fennel'],
            'Joint Pain': ['Turmeric', 'Boswellia', 'Ginger'],
            'Anxiety': ['Lavender', 'Chamomile', 'Passionflower'],
            'Insomnia': ['Valerian Root', 'Chamomile', 'Lavender'],
            'Allergies': ['Nettle Leaf', 'Butterbur', 'Quercetin'],
            'Skin Problems': ['Neem', 'Aloe Vera', 'Turmeric']
        }
        
        # Create symptom-herb matrix
        self.create_symptom_herb_matrix()

    def create_symptom_herb_matrix(self):
        # Create a unique list of all herbs
        all_herbs = list(set([herb for herbs in self.herb_data.values() for herb in herbs]))
        
        # Create a matrix of symptoms x herbs
        self.symptom_herb_matrix = pd.DataFrame(0, 
                                              index=list(self.herb_data.keys()),
                                              columns=all_herbs)
        
        # Fill the matrix
        for symptom, herbs in self.herb_data.items():
            for herb in herbs:
                self.symptom_herb_matrix.loc[symptom, herb] = 1

    def get_recommendations(self, symptoms):
        if not symptoms:
            return {'herbs': [], 'confidence_score': 0}

        # Create a symptom vector
        symptom_vector = pd.Series(0, index=self.symptom_herb_matrix.index)
        for symptom in symptoms:
            if symptom in symptom_vector.index:
                symptom_vector[symptom] = 1

        # Calculate herb scores
        herb_scores = symptom_vector.dot(self.symptom_herb_matrix)
        
        # Get top herbs
        top_herbs = herb_scores[herb_scores > 0].sort_values(ascending=False)[:3]
        
        # Calculate confidence score
        max_possible_score = len(symptoms)
        confidence_score = float(top_herbs.iloc[0] / max_possible_score if len(top_herbs) > 0 else 0)

        return {
            'herbs': top_herbs.index.tolist(),
            'confidence_score': confidence_score,
            'symptom_matches': {
                herb: [s for s in symptoms if s in self.herb_data and herb in self.herb_data[s]]
                for herb in top_herbs.index
            }
        }

    def get_herb_details(self, herb):
        return {
            'primary_uses': [symptom for symptom, herbs in self.herb_data.items() if herb in herbs],
            'preparation_methods': self._get_preparation_methods(herb),
            'dosage': self._get_dosage_info(herb)
        }

    def _get_preparation_methods(self, herb):
        # Predefined preparation methods based on herb type
        methods = {
            'Tea': ['Steep 1-2 teaspoons of dried herb in hot water for 5-10 minutes'],
            'Tincture': ['Take 20-30 drops in water, 2-3 times daily'],
            'Powder': ['Mix 1/2 teaspoon in warm water or honey']
        }
        return methods

    def _get_dosage_info(self, herb):
        return {
            'tea': '1-3 cups daily',
            'tincture': '20-30 drops, 2-3 times daily',
            'powder': '1/2 teaspoon, 2-3 times daily'
        }