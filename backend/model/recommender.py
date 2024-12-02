import os
import ast
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib

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
        
        # Define symptom categories
        self.symptom_categories = {
            'Digestive_Health': [
                'acid_reflux', 'bloating', 'gas', 'indigestion', 'stomach_pain'
            ],
            'Stress_Sleep': [
                'stress', 'anxiety', 'insomnia', 'tension'
            ],
            'Pain_Management': [
                'joint_pain', 'muscle_pain', 'inflammation', 'arthritis', 'back_pain'
            ],
            'Respiratory_Health': [
                'common_cold', 'cough', 'fever', 'nasal_congestion', 'sinus_issues'
            ],
            'Skin_Care': [
                'skin_issues', 'acne', 'dry_skin', 'eczema', 'itching'
            ]
        }
        
        # Define remedy categories
        self.remedy_categories = {
            'Digestive_Health': ['Triphala', 'Ginger'],
            'Stress_Sleep': ['Ashwagandha', 'Brahmi'],
            'Pain_Management': ['Turmeric', 'Boswellia'],
            'Respiratory_Health': ['Tulsi', 'Pippali'],
            'Skin_Care': ['Neem', 'Aloe Vera']
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
        
        # Define remedies with their primary symptoms and details
        remedy_mappings = {
            'Digestive_Health': {
                'Triphala': {
                    'symptoms': ['constipation', 'indigestion', 'poor_digestion', 'loss_of_appetite'],
                    'ingredients': 'Amalaki, Bibhitaki, Haritaki',
                    'instructions': 'Take with warm water before bed',
                    'recipe': '1/2 teaspoon powder with warm water',
                    'dosage': 'Once daily before bed',
                    'effectiveness': 4.5
                },
                'Ginger': {
                    'symptoms': ['nausea', 'indigestion', 'gas', 'bloating'],
                    'ingredients': 'Fresh ginger root',
                    'instructions': 'Steep in hot water for 10 minutes',
                    'recipe': '1-inch ginger piece in 1 cup water',
                    'dosage': '2-3 times daily after meals',
                    'effectiveness': 4.3
                },
                'Fennel': {
                    'symptoms': ['bloating', 'gas', 'indigestion', 'stomach_pain'],
                    'ingredients': 'Fennel seeds',
                    'instructions': 'Chew seeds after meals or make tea',
                    'recipe': '1 tsp seeds steeped in hot water',
                    'dosage': 'After meals as needed',
                    'effectiveness': 4.2
                },
                'Ajwain': {
                    'symptoms': ['gas', 'bloating', 'indigestion', 'stomach_pain'],
                    'ingredients': 'Ajwain seeds',
                    'instructions': 'Chew seeds or make tea',
                    'recipe': '1/2 tsp seeds with warm water',
                    'dosage': 'After meals as needed',
                    'effectiveness': 4.2
                },
                'Jeera': {
                    'symptoms': ['digestion', 'gas', 'bloating', 'appetite'],
                    'ingredients': 'Cumin seeds',
                    'instructions': 'Roast and powder, or make tea',
                    'recipe': '1/2 tsp powder or seeds in warm water',
                    'dosage': 'Before or after meals',
                    'effectiveness': 4.3
                },
                'Hingvastak': {
                    'symptoms': ['poor_digestion', 'gas', 'bloating', 'indigestion'],
                    'ingredients': 'Asafoetida, Ginger, Black pepper, Long pepper, Cumin, Black cumin, Rock salt',
                    'instructions': 'Take with warm water before meals',
                    'recipe': '1/4 tsp powder with warm water',
                    'dosage': 'Before meals',
                    'effectiveness': 4.4
                },
                'Chitrak': {
                    'symptoms': ['poor_digestion', 'loss_of_appetite', 'metabolism'],
                    'ingredients': 'Chitrak root powder',
                    'instructions': 'Take with warm water',
                    'recipe': '1/4 tsp powder with warm water',
                    'dosage': 'Twice daily before meals',
                    'effectiveness': 4.2
                },
                'Trikatu': {
                    'symptoms': ['poor_digestion', 'congestion', 'metabolism'],
                    'ingredients': 'Ginger, Black pepper, Long pepper',
                    'instructions': 'Take with honey',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Twice daily before meals',
                    'effectiveness': 4.3
                }
            },
            'Immune_Support': {
                'Guduchi': {
                    'symptoms': ['weak_immunity', 'frequent_infections', 'recovery_support'],
                    'ingredients': 'Guduchi stem powder',
                    'instructions': 'Mix with honey or warm water',
                    'recipe': '1/2 tsp powder with honey',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                },
                'Amla': {
                    'symptoms': ['low_energy', 'weak_immunity', 'seasonal_illness'],
                    'ingredients': 'Amla powder or fresh fruit',
                    'instructions': 'Take with honey or as juice',
                    'recipe': '1 tsp powder with honey',
                    'dosage': 'Once daily',
                    'effectiveness': 4.5
                },
                'Yashtimadhu': {
                    'symptoms': ['weak_immunity', 'cough', 'throat_infection'],
                    'ingredients': 'Licorice root powder',
                    'instructions': 'Mix with honey or warm water',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                },
                'Kalmegh': {
                    'symptoms': ['fever', 'infections', 'immune_support'],
                    'ingredients': 'Andrographis powder',
                    'instructions': 'Mix with water',
                    'recipe': '1/2 tsp powder with water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.5
                },
                'Chyawanprash': {
                    'symptoms': ['weak_immunity', 'low_energy', 'respiratory_health'],
                    'ingredients': 'Amla, herbs, honey, ghee',
                    'instructions': 'Take directly or with warm milk',
                    'recipe': '1-2 tsp',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.8
                },
                'Sitopaladi': {
                    'symptoms': ['cough', 'cold', 'respiratory_issues'],
                    'ingredients': 'Mishri, Pippali, Cinnamon, Cardamom',
                    'instructions': 'Take with honey',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Thrice daily',
                    'effectiveness': 4.4
                },
                'Tulsi_Ginger': {
                    'symptoms': ['cold', 'cough', 'immunity'],
                    'ingredients': 'Tulsi leaves, Fresh ginger',
                    'instructions': 'Make tea',
                    'recipe': '2-3 leaves, 1/2 inch ginger in hot water',
                    'dosage': '2-3 times daily',
                    'effectiveness': 4.5
                }
            },
            'Mens_Health': {
                'Shilajit': {
                    'symptoms': ['male_vitality', 'stamina_issues', 'low_energy'],
                    'ingredients': 'Purified Shilajit',
                    'instructions': 'Dissolve in warm milk or water',
                    'recipe': 'Rice grain sized portion',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.7
                },
                'Safed Musli': {
                    'symptoms': ['male_fertility', 'stamina_issues', 'reproductive_health'],
                    'ingredients': 'Safed Musli powder',
                    'instructions': 'Mix with milk and honey',
                    'recipe': '2-3g powder with milk',
                    'dosage': 'Once daily',
                    'effectiveness': 4.4
                }
            },
            'Metabolic_Health': {
                'Gymnema': {
                    'symptoms': ['blood_sugar_balance', 'metabolism_issues'],
                    'ingredients': 'Gymnema leaves powder',
                    'instructions': 'Take before meals',
                    'recipe': '1/2 tsp powder with water',
                    'dosage': 'Before main meals',
                    'effectiveness': 4.5
                },
                'Guggul': {
                    'symptoms': ['cholesterol_balance', 'weight_management'],
                    'ingredients': 'Purified Guggul',
                    'instructions': 'Take with warm water',
                    'recipe': 'As per package instructions',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Vijaysar': {
                    'symptoms': ['blood_sugar_balance', 'diabetes_support'],
                    'ingredients': 'Vijaysar wood or extract',
                    'instructions': 'Soak wood in water overnight',
                    'recipe': 'Use soaked water or as directed',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                },
                'Jamun': {
                    'symptoms': ['blood_sugar_balance', 'diabetes_support'],
                    'ingredients': 'Jamun seed powder',
                    'instructions': 'Take with water',
                    'recipe': '1/2 tsp powder with water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Meshashringi': {
                    'symptoms': ['blood_sugar_balance', 'metabolism_issues'],
                    'ingredients': 'Meshashringi powder',
                    'instructions': 'Take with water',
                    'recipe': '1/2 tsp powder with water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Neem_Giloy': {
                    'symptoms': ['blood_purification', 'metabolism', 'immunity'],
                    'ingredients': 'Neem leaves, Giloy stem',
                    'instructions': 'Take as juice or tablets',
                    'recipe': '15-20ml juice with water',
                    'dosage': 'Once daily',
                    'effectiveness': 4.4
                },
                'Arogyavardhini': {
                    'symptoms': ['liver_health', 'metabolism', 'digestion'],
                    'ingredients': 'Arogyavardhini vati',
                    'instructions': 'Take with warm water',
                    'recipe': '1-2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.5
                }
            },
            'Pain_Management': {
                'Turmeric': {
                    'symptoms': ['joint_pain', 'arthritis', 'body_aches', 'inflammation'],
                    'ingredients': 'Turmeric powder, Black pepper',
                    'instructions': 'Mix with warm milk and honey',
                    'recipe': '1 tsp turmeric, pinch of black pepper, 1 cup milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                },
                'Boswellia': {
                    'symptoms': ['arthritis', 'joint_pain', 'inflammation'],
                    'ingredients': 'Boswellia extract',
                    'instructions': 'Take with water after meals',
                    'recipe': 'As per package instructions',
                    'dosage': '2-3 times daily with meals',
                    'effectiveness': 4.5
                },
                'Eucalyptus Oil': {
                    'symptoms': ['muscle_pain', 'joint_pain', 'body_aches'],
                    'ingredients': 'Eucalyptus essential oil',
                    'instructions': 'Dilute with carrier oil and apply',
                    'recipe': '5 drops in 1 tbsp carrier oil',
                    'dosage': 'Apply as needed',
                    'effectiveness': 4.2
                },
                'Rasna': {
                    'symptoms': ['joint_pain', 'arthritis', 'inflammation'],
                    'ingredients': 'Rasna root powder',
                    'instructions': 'Mix with warm water or milk',
                    'recipe': '1/2 tsp powder with milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Nirgundi': {
                    'symptoms': ['joint_pain', 'muscle_pain', 'inflammation'],
                    'ingredients': 'Nirgundi leaves or oil',
                    'instructions': 'Apply oil or take powder internally',
                    'recipe': 'External application or 1/4 tsp powder',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                }
            },
            'Respiratory_Health': {
                'Tulsi': {
                    'symptoms': ['common_cold', 'cough', 'sore_throat', 'bronchial_congestion'],
                    'ingredients': 'Tulsi leaves',
                    'instructions': 'Steep in hot water for 5-10 minutes',
                    'recipe': '10-15 leaves in 1 cup water',
                    'dosage': '2-3 times daily',
                    'effectiveness': 4.4
                },
                'Licorice': {
                    'symptoms': ['sore_throat', 'cough', 'bronchial_congestion'],
                    'ingredients': 'Licorice root',
                    'instructions': 'Steep in hot water for 10 minutes',
                    'recipe': '1 tsp licorice root in 1 cup water',
                    'dosage': '1-2 times daily',
                    'effectiveness': 4.3
                },
                'Pippali': {
                    'symptoms': ['dry_cough', 'bronchial_congestion', 'respiratory_issues'],
                    'ingredients': 'Pippali powder',
                    'instructions': 'Mix with honey',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                },
                'Vasa': {
                    'symptoms': ['cough', 'bronchitis', 'respiratory_issues'],
                    'ingredients': 'Vasa leaves or extract',
                    'instructions': 'Take with honey',
                    'recipe': '1/4 tsp extract with honey',
                    'dosage': 'Thrice daily',
                    'effectiveness': 4.5
                },
                'Kantakari': {
                    'symptoms': ['respiratory_issues', 'chest_congestion'],
                    'ingredients': 'Kantakari powder',
                    'instructions': 'Mix with honey',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Talisadi': {
                    'symptoms': ['cough', 'cold', 'respiratory_issues'],
                    'ingredients': 'Talispatra, Pippali, Ela, Tvak',
                    'instructions': 'Take with honey',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Thrice daily',
                    'effectiveness': 4.5
                },
                'Yashti_Madhu': {
                    'symptoms': ['cough', 'throat_pain', 'voice_issues'],
                    'ingredients': 'Licorice root powder',
                    'instructions': 'Take with honey or warm water',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Thrice daily',
                    'effectiveness': 4.3
                },
                'Pushkarmool': {
                    'symptoms': ['asthma', 'bronchitis', 'cough'],
                    'ingredients': 'Pushkarmool powder',
                    'instructions': 'Take with honey',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                }
            },
            'Skin_Care': {
                'Neem': {
                    'symptoms': ['acne', 'skin_rashes', 'skin_allergies', 'itching'],
                    'ingredients': 'Neem leaves or powder',
                    'instructions': 'Make paste with water or apply as oil',
                    'recipe': 'As needed for application',
                    'dosage': 'Apply twice daily',
                    'effectiveness': 4.5
                },
                'Aloe_Vera': {
                    'symptoms': ['minor_burns', 'dry_skin', 'skin_rashes', 'minor_cuts'],
                    'ingredients': 'Aloe vera gel',
                    'instructions': 'Apply directly to affected area',
                    'recipe': 'Fresh gel or as per product instructions',
                    'dosage': 'Apply 2-3 times daily',
                    'effectiveness': 4.6
                },
                'Manjistha': {
                    'symptoms': ['skin_allergies', 'skin_rashes', 'acne'],
                    'ingredients': 'Manjistha powder',
                    'instructions': 'Mix with water to make paste',
                    'recipe': 'Make paste with water',
                    'dosage': 'Apply once daily',
                    'effectiveness': 4.3
                },
                'Kumkumadi': {
                    'symptoms': ['skin_blemishes', 'uneven_tone', 'acne_marks'],
                    'ingredients': 'Kumkumadi tailam',
                    'instructions': 'Apply on affected area',
                    'recipe': 'Few drops directly on skin',
                    'dosage': 'Once daily before bed',
                    'effectiveness': 4.6
                },
                'Yashtimadhu': {
                    'symptoms': ['skin_allergies', 'pigmentation', 'skin_health'],
                    'ingredients': 'Licorice powder',
                    'instructions': 'Mix with milk to make paste',
                    'recipe': 'Make paste with raw milk',
                    'dosage': 'Apply once daily',
                    'effectiveness': 4.4
                }
            },
            'Stress_Sleep': {
                'Ashwagandha': {
                    'symptoms': ['stress', 'anxiety', 'insomnia', 'fatigue'],
                    'ingredients': 'Ashwagandha root powder',
                    'instructions': 'Mix with warm milk and honey',
                    'recipe': '1 tsp powder, 1 cup milk, honey to taste',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.7
                },
                'Brahmi': {
                    'symptoms': ['mental_fatigue', 'anxiety', 'concentration_issues'],
                    'ingredients': 'Brahmi leaves or powder',
                    'instructions': 'Mix powder with warm water or milk',
                    'recipe': '1/2 tsp powder with water or milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                },
                'Jatamansi': {
                    'symptoms': ['insomnia', 'anxiety', 'restlessness'],
                    'ingredients': 'Jatamansi powder',
                    'instructions': 'Mix with warm milk before bed',
                    'recipe': '1/4 tsp powder with milk',
                    'dosage': 'Once before bed',
                    'effectiveness': 4.5
                }
            },
            'Teen_Health': {
                'Neem': {
                    'symptoms': ['teenage_acne', 'skin_issues'],
                    'ingredients': 'Neem powder or leaves',
                    'instructions': 'Make paste or take internally',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Brahmi': {
                    'symptoms': ['study_stress', 'concentration_issues'],
                    'ingredients': 'Brahmi powder',
                    'instructions': 'Mix with honey or milk',
                    'recipe': '1/4 tsp powder with honey',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                }
            },
            'Womens_Health': {
                'Shatavari': {
                    'symptoms': ['menstrual_irregularities', 'hormonal_imbalance', 'fertility_support'],
                    'ingredients': 'Shatavari powder',
                    'instructions': 'Mix with warm milk',
                    'recipe': '1 tsp powder with milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                },
                'Lodhra': {
                    'symptoms': ['menstrual_irregularities', 'vaginal_infections'],
                    'ingredients': 'Lodhra powder',
                    'instructions': 'Mix with water',
                    'recipe': '1/2 tsp powder with water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Kumari': {
                    'symptoms': ['menopause_symptoms', 'hormonal_imbalance'],
                    'ingredients': 'Kumari (Aloe) juice',
                    'instructions': 'Take with water',
                    'recipe': '20ml juice with water',
                    'dosage': 'Once daily',
                    'effectiveness': 4.4
                },
                'Ashoka': {
                    'symptoms': ['menstrual_pain', 'irregular_periods', 'uterine_health'],
                    'ingredients': 'Ashoka bark powder',
                    'instructions': 'Take with water',
                    'recipe': '1/2 tsp powder with water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.5
                },
                'Chandraprabha': {
                    'symptoms': ['urinary_tract_health', 'reproductive_health'],
                    'ingredients': 'Chandraprabha vati',
                    'instructions': 'Take with water',
                    'recipe': '1-2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                },
                'Ashokarishta': {
                    'symptoms': ['menstrual_pain', 'irregular_periods', 'uterine_health'],
                    'ingredients': 'Ashoka bark, other herbs',
                    'instructions': 'Take with equal water',
                    'recipe': '15-20ml with equal water',
                    'dosage': 'Twice daily after meals',
                    'effectiveness': 4.6
                },
                'Pushyanug': {
                    'symptoms': ['white_discharge', 'vaginal_health'],
                    'ingredients': 'Pushyanug churna',
                    'instructions': 'Take with water',
                    'recipe': '1/2 tsp with water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Kanchanar_Guggulu': {
                    'symptoms': ['thyroid_issues', 'hormonal_balance'],
                    'ingredients': 'Kanchanar bark, Guggulu, herbs',
                    'instructions': 'Take with warm water',
                    'recipe': '2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                }
            },
            'Mental_Health': {
                'Shankhpushpi': {
                    'symptoms': ['memory', 'concentration', 'mental_fatigue'],
                    'ingredients': 'Shankhpushpi powder',
                    'instructions': 'Take with milk',
                    'recipe': '1/2 tsp powder with milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.5
                },
                'Brahmi_Vati': {
                    'symptoms': ['anxiety', 'stress', 'memory'],
                    'ingredients': 'Brahmi vati tablets',
                    'instructions': 'Take with water',
                    'recipe': '1-2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                },
                'Saraswatarishta': {
                    'symptoms': ['memory', 'concentration', 'mental_fatigue'],
                    'ingredients': 'Brahmi, other herbs',
                    'instructions': 'Take with equal water',
                    'recipe': '15-20ml with equal water',
                    'dosage': 'Twice daily after meals',
                    'effectiveness': 4.5
                },
                'Brahmi_Ghrita': {
                    'symptoms': ['memory', 'anxiety', 'mental_health'],
                    'ingredients': 'Brahmi, Ghee',
                    'instructions': 'Take with warm milk',
                    'recipe': '1/2 tsp with warm milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                },
                'Manasamitra_Vatakam': {
                    'symptoms': ['stress', 'anxiety', 'sleep_issues'],
                    'ingredients': 'Herbal compound',
                    'instructions': 'Take with warm milk',
                    'recipe': '1-2 tablets',
                    'dosage': 'Once at bedtime',
                    'effectiveness': 4.4
                }
            },
            'Joint_Health': {
                'Maharasnadi_Kwath': {
                    'symptoms': ['joint_pain', 'arthritis', 'inflammation'],
                    'ingredients': 'Rasna, Guduchi, Ginger, other herbs',
                    'instructions': 'Take with warm water',
                    'recipe': '15-20ml with equal warm water',
                    'dosage': 'Twice daily after meals',
                    'effectiveness': 4.6
                },
                'Yograj_Guggulu': {
                    'symptoms': ['joint_pain', 'muscle_pain', 'arthritis'],
                    'ingredients': 'Guggulu, Triphala, other herbs',
                    'instructions': 'Take with warm water',
                    'recipe': '2 tablets',
                    'dosage': 'Twice daily after meals',
                    'effectiveness': 4.7
                },
                'Vishgarbha_Oil': {
                    'symptoms': ['joint_pain', 'muscle_stiffness', 'inflammation'],
                    'ingredients': 'Sesame oil base with herbs',
                    'instructions': 'External application with gentle massage',
                    'recipe': 'Apply as needed',
                    'dosage': '1-2 times daily',
                    'effectiveness': 4.4
                }
            },
            'Hair_Care': {
                'Bhringaraj': {
                    'symptoms': ['hair_loss', 'premature_graying', 'scalp_health'],
                    'ingredients': 'Bhringaraj powder',
                    'instructions': 'Internal use and external application',
                    'recipe': '1/2 tsp powder with milk internally, paste for external use',
                    'dosage': 'Twice daily internal, weekly external',
                    'effectiveness': 4.5
                },
                'Neeli_Bhringadi': {
                    'symptoms': ['hair_loss', 'dandruff', 'scalp_health'],
                    'ingredients': 'Neeli, Bhringaraj, Coconut oil',
                    'instructions': 'Apply to scalp and hair',
                    'recipe': 'Warm oil application',
                    'dosage': '2-3 times per week',
                    'effectiveness': 4.6
                },
                'Brahmi_Hair_Oil': {
                    'symptoms': ['hair_growth', 'premature_graying', 'stress_related_hair_loss'],
                    'ingredients': 'Brahmi, Amla, oil base',
                    'instructions': 'Massage into scalp',
                    'recipe': 'Warm oil application',
                    'dosage': '2-3 times per week',
                    'effectiveness': 4.4
                }
            },
            'Eye_Care': {
                'Triphala_Eye_Wash': {
                    'symptoms': ['eye_strain', 'dry_eyes', 'computer_vision_syndrome'],
                    'ingredients': 'Triphala powder',
                    'instructions': 'Make decoction for eye wash',
                    'recipe': 'Diluted triphala water',
                    'dosage': 'Twice daily as eye wash',
                    'effectiveness': 4.3
                },
                'Saptamrit_Lauh': {
                    'symptoms': ['vision_problems', 'eye_weakness', 'night_blindness'],
                    'ingredients': 'Herbal mineral compound',
                    'instructions': 'Take with honey',
                    'recipe': '1-2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                },
                'Rose_Water': {
                    'symptoms': ['eye_strain', 'redness', 'irritation'],
                    'ingredients': 'Pure rose water',
                    'instructions': 'Use as eye drops',
                    'recipe': '2-3 drops per eye',
                    'dosage': '2-3 times daily',
                    'effectiveness': 4.2
                }
            },
            'Oral_Health': {
                'Dashana_Sanskar': {
                    'symptoms': ['tooth_pain', 'gum_problems', 'oral_hygiene'],
                    'ingredients': 'Herbal tooth powder',
                    'instructions': 'Use as tooth powder',
                    'recipe': 'Apply directly to teeth and gums',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.3
                },
                'Khadiradi_Vati': {
                    'symptoms': ['mouth_ulcers', 'gum_disease', 'bad_breath'],
                    'ingredients': 'Khadir, other herbs',
                    'instructions': 'Suck on tablet',
                    'recipe': '1-2 tablets',
                    'dosage': '3-4 times daily',
                    'effectiveness': 4.5
                },
                'Yashtimadhu_Ghanvati': {
                    'symptoms': ['mouth_ulcers', 'throat_pain', 'gum_health'],
                    'ingredients': 'Licorice extract',
                    'instructions': 'Suck on tablet',
                    'recipe': '1 tablet',
                    'dosage': '3-4 times daily',
                    'effectiveness': 4.4
                }
            },
            'Sleep_Quality': {
                'Tagara': {
                    'symptoms': ['insomnia', 'restlessness', 'anxiety'],
                    'ingredients': 'Tagara root powder',
                    'instructions': 'Take with warm milk',
                    'recipe': '1/4 tsp powder with milk',
                    'dosage': 'Once before bed',
                    'effectiveness': 4.5
                },
                'Jatamansi': {
                    'symptoms': ['sleep_disorders', 'anxiety', 'stress'],
                    'ingredients': 'Jatamansi powder',
                    'instructions': 'Take with warm milk',
                    'recipe': '1/4 tsp powder with milk',
                    'dosage': 'Once before bed',
                    'effectiveness': 4.6
                },
                'Shankhapushpi_Syrup': {
                    'symptoms': ['insomnia', 'mental_stress', 'anxiety'],
                    'ingredients': 'Shankhapushpi extract',
                    'instructions': 'Take with water',
                    'recipe': '10-15ml',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                }
            }
        }
        
        # Add these additional remedies to the remedy_mappings dictionary
        remedy_mappings.update({
            'Liver_Health': {
                'Liv52': {
                    'symptoms': ['fatty_liver', 'poor_digestion', 'liver_function'],
                    'ingredients': 'Capparis spinosa, Cichorium intybus, other herbs',
                    'instructions': 'Take with water after meals',
                    'recipe': '2 tablets',
                    'dosage': 'Twice daily after meals',
                    'effectiveness': 4.7
                },
                'Kutki': {
                    'symptoms': ['liver_detox', 'skin_problems', 'digestive_issues'],
                    'ingredients': 'Picrorhiza kurroa',
                    'instructions': 'Take with warm water',
                    'recipe': '1/4 tsp powder with water',
                    'dosage': 'Twice daily before meals',
                    'effectiveness': 4.5
                },
                'Punarnava': {
                    'symptoms': ['liver_support', 'water_retention', 'detoxification'],
                    'ingredients': 'Boerhavia diffusa',
                    'instructions': 'Take as decoction or powder',
                    'recipe': '1/2 tsp powder with warm water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                }
            },
            'Heart_Health': {
                'Arjuna': {
                    'symptoms': ['heart_health', 'blood_pressure', 'cardiac_strength'],
                    'ingredients': 'Terminalia arjuna bark',
                    'instructions': 'Take with warm milk or water',
                    'recipe': '1/2 tsp powder with milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.8
                },
                'Shankhapushpi': {
                    'symptoms': ['heart_health', 'stress', 'anxiety'],
                    'ingredients': 'Convolvulus pluricaulis',
                    'instructions': 'Take with warm milk',
                    'recipe': '1/2 tsp powder with milk',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.5
                },
                'Hridayarnava_Rasa': {
                    'symptoms': ['heart_weakness', 'cardiac_support', 'circulation'],
                    'ingredients': 'Herbal mineral compound',
                    'instructions': 'Take with honey',
                    'recipe': '1-2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                }
            },
            'Kidney_Health': {
                'Gokshura': {
                    'symptoms': ['urinary_health', 'kidney_stones', 'prostate_health'],
                    'ingredients': 'Tribulus terrestris',
                    'instructions': 'Take as decoction or powder',
                    'recipe': '1/2 tsp powder with warm water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.5
                },
                'Punarnava_Mandoor': {
                    'symptoms': ['kidney_function', 'anemia', 'edema'],
                    'ingredients': 'Punarnava, Iron compound',
                    'instructions': 'Take with honey',
                    'recipe': '2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                },
                'Chandraprabha_Vati': {
                    'symptoms': ['urinary_tract', 'diabetes', 'kidney_function'],
                    'ingredients': 'Multiple herbs and minerals',
                    'instructions': 'Take with water',
                    'recipe': '2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.7
                }
            },
            'Blood_Health': {
                'Manjistha': {
                    'symptoms': ['blood_purification', 'skin_health', 'lymphatic_health'],
                    'ingredients': 'Rubia cordifolia',
                    'instructions': 'Take with warm water',
                    'recipe': '1/2 tsp powder with water',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.4
                },
                'Saptamrit_Loha': {
                    'symptoms': ['anemia', 'weakness', 'low_hemoglobin'],
                    'ingredients': 'Iron compound with herbs',
                    'instructions': 'Take with honey',
                    'recipe': '1-2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                },
                'Praval_Pishti': {
                    'symptoms': ['calcium_deficiency', 'bone_health', 'blood_health'],
                    'ingredients': 'Coral calcium compound',
                    'instructions': 'Take with milk',
                    'recipe': '250mg powder',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.5
                }
            },
            'Bone_Health': {
                'Laksha_Guggulu': {
                    'symptoms': ['bone_healing', 'fractures', 'joint_pain'],
                    'ingredients': 'Guggulu with herbs',
                    'instructions': 'Take with warm water',
                    'recipe': '2 tablets',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.7
                },
                'Godanti_Bhasma': {
                    'symptoms': ['calcium_deficiency', 'bone_weakness', 'joint_pain'],
                    'ingredients': 'Processed gypsum',
                    'instructions': 'Take with honey',
                    'recipe': '250mg powder',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.5
                },
                'Praval_Panchamrit': {
                    'symptoms': ['bone_strength', 'calcium_absorption', 'weakness'],
                    'ingredients': 'Coral calcium with herbs',
                    'instructions': 'Take with milk',
                    'recipe': '250mg powder',
                    'dosage': 'Twice daily',
                    'effectiveness': 4.6
                }
            }
        })
        
        # Create training data from remedy mappings
        for category, remedies in remedy_mappings.items():
            for remedy_name, remedy_info in remedies.items():
                training_data.append({
                    'symptoms': str(remedy_info['symptoms']),
                    'remedies': str([remedy_name]),
                    'effectiveness_rating': remedy_info['effectiveness'],
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
        print("\n=== Starting Recommendation Process ===")
        print(f"Input symptoms: {symptoms}")
        
        if not symptoms:
            print("No symptoms provided")
            return []
        
        # Convert symptoms to lowercase for matching
        symptoms = [s.lower().replace(' ', '_') for s in symptoms]
        print(f"Normalized symptoms: {symptoms}")
        
        # Debug print the available categories and their symptoms
        print("\nAvailable Categories:")
        for cat, cat_symptoms in self.symptom_categories.items():
            print(f"{cat}: {cat_symptoms}")
        
        # Find matching category based on symptoms
        matched_categories = {}
        for cat, cat_symptoms in self.symptom_categories.items():
            matching = [s for s in symptoms if s in cat_symptoms]
            if matching:
                matched_categories[cat] = matching
                print(f"\nFound matching category: {cat}")
                print(f"Matching symptoms: {matching}")
        
        if not matched_categories:
            print("No matching categories found")
            return []
        
        recommendations = []
        
        # Look for remedies in each matching category
        for category, matched_symptoms in matched_categories.items():
            print(f"\nChecking remedies for category: {category}")
            category_remedies = self.remedy_categories.get(category, {})
            
            if not category_remedies:
                print(f"No remedies found for category {category}")
                continue
            
            # Find matching remedies
            for remedy_name, remedy_info in category_remedies.items():
                print(f"\nChecking remedy: {remedy_name}")
                print(f"Remedy symptoms: {remedy_info['symptoms']}")
                
                # Check if any of the remedy's symptoms match the user's symptoms
                matching_symptoms = [s for s in matched_symptoms if s in remedy_info['symptoms']]
                
                if matching_symptoms:
                    print(f"Found matching symptoms: {matching_symptoms}")
                    recommendation = {
                        'name': remedy_name,
                        'category': category,
                        'herbs': [remedy_name],
                        'ingredients': remedy_info['ingredients'],
                        'instructions': remedy_info['instructions'],
                        'recipe': remedy_info['recipe'],
                        'dosage': remedy_info['dosage'],
                        'effectiveness': remedy_info.get('effectiveness', 4.0),
                        'matching_symptoms': matching_symptoms
                    }
                    recommendations.append(recommendation)
                    print(f"Added recommendation: {remedy_name}")
        
        # Sort by effectiveness
        recommendations.sort(key=lambda x: x['effectiveness'], reverse=True)
        
        print(f"\nTotal recommendations found: {len(recommendations)}")
        for rec in recommendations[:3]:
            print(f"- {rec['name']} (Effectiveness: {rec['effectiveness']})")
        
        # Return top 3 most relevant recommendations
        return recommendations[:3]

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
