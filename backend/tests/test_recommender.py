import unittest
import pandas as pd
from backend.model.recommender import HerbRecommender
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

class TestHerbRecommender(unittest.TestCase):
    def setUp(self):
        """Set up test data and initialize recommender"""
        self.recommender = HerbRecommender()
        
        # Create test dataset with proper string formatting for lists
        self.test_data = {
            'symptoms': [
                '["acid_reflux", "indigestion", "stomach_pain"]',
                '["stress", "anxiety", "insomnia"]',
                '["joint_pain", "inflammation", "arthritis"]',
                '["common_cold", "cough", "fever"]',
                '["skin_issues", "acne", "inflammation"]'
            ],
            'remedies': [
                '["Triphala"]',
                '["Ashwagandha"]',
                '["Turmeric"]',
                '["Tulsi"]',
                '["Neem"]'
            ],
            'effectiveness_rating': [4.5, 4.7, 4.8, 4.6, 4.3],
            'severity_level': ['Moderate'] * 5,
            'demographics': ['["Adult", "Senior"]'] * 5,
            'contraindications': ['["Pregnancy"]'] * 5,
            'season_suitable': ['["All Seasons"]'] * 5
        }
        self.df = pd.DataFrame(self.test_data)

    def test_model_performance(self):
        """Test ML model's performance metrics"""
        print("\nTesting Model Performance...\n")
        
        test_cases = [
            (['acid_reflux', 'indigestion'], 'Triphala'),
            (['stress', 'anxiety'], 'Ashwagandha'),
            (['joint_pain', 'inflammation'], 'Turmeric')
        ]
        
        for symptoms, expected_remedy in test_cases:
            predictions = self.recommender.predict_remedies(symptoms)
            self.assertTrue(
                any(p['herbs'] == expected_remedy for p in predictions),
                f"Failed to predict {expected_remedy} for symptoms {symptoms}"
            )

if __name__ == '__main__':
    unittest.main() 