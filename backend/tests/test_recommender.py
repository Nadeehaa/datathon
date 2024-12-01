from backend.model.recommender import HerbRecommender
import pandas as pd
import os

def test_recommender():
    # Initialize the recommender
    recommender = HerbRecommender()
    
    # Example user symptoms
    test_cases = [
        ['fever', 'headache'],
        ['cough', 'sore throat'],
        ['anxiety', 'insomnia'],
        ['joint pain']
    ]
    
    print("\n=== Testing Herbal Remedy Recommendations ===")
    for symptoms in test_cases:
        print(f"\nUser Symptoms: {symptoms}")
        remedies = recommender.predict(symptoms)
        if remedies:
            for i, remedy in enumerate(remedies, 1):
                print(f"\nRemedy {i}:")
                print(f"Herbs: {remedy['herbs']}")
                print(f"Ingredients: {remedy['ingredients']}")
                print(f"Instructions: {remedy['instructions']}")
                print(f"Recipe: {remedy['recipe']}")
                print(f"Dosage: {remedy['dosage']}")
        else:
            print("No remedies found for these symptoms.")

if __name__ == "__main__":
    test_recommender() 