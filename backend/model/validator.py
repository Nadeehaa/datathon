class SymptomValidator:
    def __init__(self, data_processor):
        """
        Initialize SymptomValidator with a DataProcessor.
        
        Args:
            data_processor: The data processor containing valid symptoms.
        """
        self.valid_symptoms = set(data_processor.get_feature_names())

    def validate_symptoms(self, symptoms):
        """
        Validate the symptoms input.

        Args:
            symptoms (list): List of symptoms to validate.

        Returns:
            dict: A dictionary with validation results.
        """
        # Initial validation
        if not isinstance(symptoms, list):
            return {"valid": False, "error": "Symptoms must be a list.", "invalid_symptoms": []}
        
        if not symptoms:  # Check if empty
            return {"valid": False, "error": "Symptoms list is empty.", "invalid_symptoms": []}
        
        # Check if all symptoms are strings
        if not all(isinstance(symptom, str) for symptom in symptoms):
            return {"valid": False, "error": "All symptoms must be strings.", "invalid_symptoms": []}
        
        # Check for empty or whitespace-only strings
        if not all(len(symptom.strip()) > 0 for symptom in symptoms):
            return {"valid": False, "error": "Symptoms must not be empty or whitespace.", "invalid_symptoms": []}
        
        # Check against valid symptoms
        valid_symptoms = [symptom for symptom in symptoms if symptom in self.valid_symptoms]
        invalid_symptoms = [symptom for symptom in symptoms if symptom not in self.valid_symptoms]

        return {
            "valid": len(invalid_symptoms) == 0,
            "valid_symptoms": valid_symptoms,
            "invalid_symptoms": invalid_symptoms,
        }

    def get_valid_symptoms(self):
        """
        Get list of all valid symptoms.

        Returns:
            list: Sorted list of valid symptoms.
        """
        return sorted(list(self.valid_symptoms))
