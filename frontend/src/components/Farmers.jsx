import React, { useState } from 'react';

const Farmers = () => {
    const [language, setLanguage] = useState('en');
    const [formData, setFormData] = useState({
        soilType: '',
        climate: '',
        waterAvailability: ''
    });

    const translations = {
        en: {
            title: 'For Farmers: Crop Growing Suggestions',
            soilType: 'Soil Type',
            climate: 'Climate',
            waterAvailability: 'Water Availability',
            submit: 'Submit',
            soilOptions: [
                { value: 'clay', label: 'Clay' },
                { value: 'sandy', label: 'Sandy' },
                { value: 'loamy', label: 'Loamy' }
            ],
            climateOptions: [
                { value: 'tropical', label: 'Tropical' },
                { value: 'temperate', label: 'Temperate' },
                { value: 'arid', label: 'Arid' }
            ],
            waterOptions: [
                { value: 'high', label: 'High' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' }
            ]
        },
        hi: {
            title: 'किसानों के लिए: फसल उगाने के सुझाव',
            soilType: 'मिट्टी का प्रकार',
            climate: 'जलवायु',
            waterAvailability: 'पानी की उपलब्धता',
            submit: 'जमा करें',
            soilOptions: [
                { value: 'clay', label: 'चिकनी मिट्टी' },
                { value: 'sandy', label: 'बलुई मिट्टी' },
                { value: 'loamy', label: 'दोमट मिट्टी' }
            ],
            climateOptions: [
                { value: 'tropical', label: 'उष्णकटिबंधीय' },
                { value: 'temperate', label: 'समशीतोष्ण' },
                { value: 'arid', label: 'शुष्क' }
            ],
            waterOptions: [
                { value: 'high', label: 'अधिक' },
                { value: 'medium', label: 'मध्यम' },
                { value: 'low', label: 'कम' }
            ]
        },
        te: {
            title: 'రైతులకు: పంట పెంపక సూచనలు',
            soilType: 'నేల రకం',
            climate: 'వాతావరణం',
            waterAvailability: 'నీటి లభ్యత',
            submit: 'సమర్పించండి',
            soilOptions: [
                { value: 'clay', label: 'బంక మట్టి' },
                { value: 'sandy', label: 'ఇసుక నేల' },
                { value: 'loamy', label: 'లోమీ నేల' }
            ],
            climateOptions: [
                { value: 'tropical', label: 'ఉష్ణమండల' },
                { value: 'temperate', label: 'సమశీతోష్ణ' },
                { value: 'arid', label: 'ఎండ' }
            ],
            waterOptions: [
                { value: 'high', label: 'ఎక్కువ' },
                { value: 'medium', label: 'మధ్యస్థం' },
                { value: 'low', label: 'తక్కువ' }
            ]
        }
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="farmers-container">
            <div className="language-selector">
                <select value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="te">తెలుగు</option>
                </select>
            </div>

            <form onSubmit={handleSubmit}>
                <h2>{translations[language].title}</h2>
                
                <div className="form-group">
                    <label>{translations[language].soilType}</label>
                    <select 
                        name="soilType" 
                        value={formData.soilType} 
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        {translations[language].soilOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>{translations[language].climate}</label>
                    <select 
                        name="climate" 
                        value={formData.climate} 
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        {translations[language].climateOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>{translations[language].waterAvailability}</label>
                    <select 
                        name="waterAvailability" 
                        value={formData.waterAvailability} 
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        {translations[language].waterOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">{translations[language].submit}</button>
            </form>
        </div>
    );
};

export default Farmers;