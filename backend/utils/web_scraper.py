import requests
from bs4 import BeautifulSoup
from typing import List, Dict
import json

class HerbalMedicineScraper:
    def __init__(self):
        # Predefined herbal database for reliable information
        self.herbal_database = {
            'Tulsi': {
                'description': 'Holy Basil (Tulsi) is a powerful adaptogenic herb with antibacterial, antiviral, and immune-boosting properties.',
                'benefits': [
                    'Boosts immunity',
                    'Reduces stress and anxiety',
                    'Fights respiratory infections',
                    'Anti-inflammatory properties'
                ],
                'scientific_name': 'Ocimum sanctum',
                'preparations': {
                    'tea': {
                        'ingredients': [
                            '2-3 fresh Tulsi leaves or 1 tsp dried Tulsi',
                            '1 cup hot water',
                            'Honey (optional)',
                            'Ginger (optional)'
                        ],
                        'instructions': [
                            'Bring water to a boil',
                            'Add fresh or dried Tulsi leaves',
                            'Steep for 5-10 minutes',
                            'Strain and add honey if desired'
                        ],
                        'dosage': '2-3 cups daily'
                    },
                    'powder': {
                        'ingredients': [
                            '1/2 teaspoon Tulsi powder',
                            'Warm water or milk',
                            'Honey (optional)'
                        ],
                        'instructions': [
                            'Mix powder in warm water or milk',
                            'Add honey to taste',
                            'Stir well before drinking'
                        ],
                        'dosage': '1/2 teaspoon twice daily'
                    }
                }
            },
            'Ginger': {
                'description': 'Ginger is a powerful anti-inflammatory and digestive aid with numerous health benefits.',
                'benefits': [
                    'Reduces nausea and motion sickness',
                    'Anti-inflammatory properties',
                    'Aids digestion',
                    'Boosts immunity'
                ],
                'scientific_name': 'Zingiber officinale',
                'preparations': {
                    'tea': {
                        'ingredients': [
                            '1-inch fresh ginger root or 1 tsp dried ginger',
                            '1 cup hot water',
                            'Lemon (optional)',
                            'Honey (optional)'
                        ],
                        'instructions': [
                            'Peel and slice fresh ginger',
                            'Boil water and add ginger',
                            'Simmer for 5-10 minutes',
                            'Strain and add honey/lemon if desired'
                        ],
                        'dosage': '2-3 cups daily'
                    },
                    'powder': {
                        'ingredients': [
                            '1/4 teaspoon ginger powder',
                            'Warm water',
                            'Honey (optional)'
                        ],
                        'instructions': [
                            'Mix powder in warm water',
                            'Add honey to taste',
                            'Stir well before drinking'
                        ],
                        'dosage': '1/4 teaspoon 3-4 times daily'
                    }
                }
            },
            'Ashwagandha': {
                'description': 'Ashwagandha is an ancient medicinal herb known for its adaptogenic properties and stress-reducing benefits.',
                'benefits': [
                    'Reduces stress and anxiety',
                    'Improves sleep quality',
                    'Boosts immunity',
                    'Increases energy and stamina',
                    'Enhances concentration'
                ],
                'scientific_name': 'Withania somnifera',
                'preparations': {
                    'powder': {
                        'ingredients': [
                            '1/2 teaspoon Ashwagandha powder',
                            '1 cup warm milk',
                            '1 teaspoon honey',
                            'Pinch of cardamom (optional)',
                            'Pinch of cinnamon (optional)'
                        ],
                        'instructions': [
                            'Heat milk until warm (not boiling)',
                            'Add Ashwagandha powder and spices',
                            'Stir well to combine',
                            'Add honey to taste',
                            'Drink before bedtime for best results'
                        ],
                        'dosage': '1/2 teaspoon once or twice daily'
                    },
                    'tea': {
                        'ingredients': [
                            '1 teaspoon Ashwagandha root',
                            '1 cup water',
                            'Honey to taste',
                            'Lemon slice (optional)'
                        ],
                        'instructions': [
                            'Boil water in a pot',
                            'Add Ashwagandha root',
                            'Simmer for 10-15 minutes',
                            'Strain and let cool slightly',
                            'Add honey and lemon if desired'
                        ],
                        'dosage': '1 cup daily, preferably before bed'
                    }
                }
            },
            'Turmeric': {
                'description': 'Turmeric is a powerful anti-inflammatory herb with numerous healing properties.',
                'benefits': [
                    'Powerful anti-inflammatory',
                    'Natural pain reliever',
                    'Improves digestion',
                    'Boosts immune system',
                    'Supports joint health'
                ],
                'scientific_name': 'Curcuma longa',
                'preparations': {
                    'golden_milk': {
                        'ingredients': [
                            '1 cup milk (dairy or plant-based)',
                            '1 teaspoon turmeric powder',
                            '1/4 teaspoon black pepper',
                            '1/2 teaspoon ginger powder',
                            '1/2 teaspoon cinnamon',
                            'Honey to taste'
                        ],
                        'instructions': [
                            'Heat milk in a saucepan over medium heat',
                            'Add turmeric, black pepper, ginger, and cinnamon',
                            'Whisk well to combine',
                            'Simmer for 5-10 minutes',
                            'Strain if desired',
                            'Add honey to taste',
                            'Drink while warm'
                        ],
                        'dosage': '1 cup daily, preferably before bed'
                    },
                    'paste': {
                        'ingredients': [
                            '1/4 cup turmeric powder',
                            '1/2 teaspoon black pepper',
                            '1/2 cup water',
                            '1 tablespoon coconut oil'
                        ],
                        'instructions': [
                            'Mix turmeric and black pepper in a small saucepan',
                            'Add water and coconut oil',
                            'Heat over medium heat, stirring constantly',
                            'Cook until mixture forms a thick paste (5-7 minutes)',
                            'Let cool and store in a glass jar',
                            'Can be added to smoothies, tea, or food'
                        ],
                        'dosage': '1/4-1/2 teaspoon of paste 1-3 times daily'
                    }
                }
            }
        }

    def get_herbal_info(self, herbs: List[str]) -> Dict:
        herbal_info = {}
        
        for herb in herbs:
            try:
                # First try to get info from our database
                if herb in self.herbal_database:
                    herbal_info[herb] = self.herbal_database[herb]
                else:
                    # Fallback to web scraping for unknown herbs
                    scraped_info = self._scrape_herb_info(herb)
                    herbal_info[herb] = scraped_info
            except Exception as e:
                print(f"Error fetching data for {herb}: {str(e)}")
                herbal_info[herb] = self._get_default_info(herb)
        
        return herbal_info

    def _scrape_herb_info(self, herb: str) -> Dict:
        # Implement actual web scraping logic here
        # This is a placeholder that returns default information
        return {
            'description': f'{herb} is a traditional medicinal herb.',
            'benefits': [
                'Natural healing properties',
                'Traditional medicinal uses',
                'Holistic health benefits'
            ],
            'scientific_name': 'Not available',
            'preparations': {
                'tea': {
                    'ingredients': [
                        f'1-2 teaspoons dried {herb}',
                        'Hot water',
                        'Honey (optional)'
                    ],
                    'instructions': [
                        'Steep in hot water for 5-10 minutes',
                        'Strain and serve',
                        'Add honey to taste'
                    ],
                    'dosage': '2-3 cups daily'
                }
            }
        }

    def _get_default_info(self, herb: str) -> Dict:
        return {
            'description': f'Information for {herb} is currently being researched.',
            'benefits': ['Please consult an Ayurvedic practitioner for specific benefits.'],
            'scientific_name': 'Not available',
            'preparations': {
                'general': {
                    'note': 'Please consult an Ayurvedic practitioner for preparation instructions.'
                }
            }
        }