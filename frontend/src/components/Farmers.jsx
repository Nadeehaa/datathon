import React, { useState } from 'react';
import axios from 'axios';

const Farmers = () => {
    const [language, setLanguage] = useState('en');
    const [formData, setFormData] = useState({
        soilType: '',
        climate: '',
        waterAvailability: '',
        location: ''
    });
    const [weatherData, setWeatherData] = useState(null);
    const [cropSuggestions, setCropSuggestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const translations = {
        en: {
            title: 'Crop Growing Recommendation System',
            soilType: 'Soil Type',
            climate: 'Climate Zone',
            waterAvailability: 'Water Resources',
            submit: 'Get Recommendations',
            location: 'Farm Location',
            soilOptions: [
                { value: 'clay', label: 'Clay Soil' },
                { value: 'sandy', label: 'Sandy Soil' },
                { value: 'loamy', label: 'Loamy Soil' }
            ],
            climateOptions: [
                { value: 'tropical', label: 'Tropical Climate' },
                { value: 'temperate', label: 'Temperate Climate' },
                { value: 'arid', label: 'Arid Climate' }
            ],
            waterOptions: [
                { value: 'high', label: 'High Water Availability' },
                { value: 'medium', label: 'Medium Water Availability' },
                { value: 'low', label: 'Low Water Availability' }
            ]
        },
        hi: {
            title: 'फसल उगाने की सिफारिश प्रणाली',
            soilType: 'मिट्टी का प्रकार',
            climate: 'जलवायु क्षेत्र',
            waterAvailability: 'जल संसाधन',
            submit: 'सिफारिशें प्राप्त करें',
            location: 'खेत का स्थान',
            soilOptions: [
                { value: 'clay', label: 'चिकनी मिट्टी' },
                { value: 'sandy', label: 'बलुई मिट्टी' },
                { value: 'loamy', label: 'दोमट मिट्टी' }
            ],
            climateOptions: [
                { value: 'tropical', label: 'उष्णकटिबंधीय जलवायु' },
                { value: 'temperate', label: 'समशीतोष्ण जलवायु' },
                { value: 'arid', label: 'शुष्क जलवायु' }
            ],
            waterOptions: [
                { value: 'high', label: 'उच्च जल उपलब्धता' },
                { value: 'medium', label: 'मध्यम जल उपलब्धता' },
                { value: 'low', label: 'कम जल उपलब्धता' }
            ]
        },
        te: {
            title: 'పంట పెంచే సిఫారసు సిస్టం',
            soilType: 'నేల రకం',
            climate: 'వాతావరణ మండలం',
            waterAvailability: 'నీటి వనరులు',
            submit: 'సిఫారసులు పొందండి',
            location: 'పొలం స్థానం',
            soilOptions: [
                { value: 'clay', label: 'బంక మట్టి' },
                { value: 'sandy', label: 'ఇసుక నేల' },
                { value: 'loamy', label: 'లోమీ నేల' }
            ],
            climateOptions: [
                { value: 'tropical', label: 'ఉష్ణమండల వాతావరణం' },
                { value: 'temperate', label: 'సమశీతోష్ణ వాతావరణం' },
                { value: 'arid', label: 'ఎండ వాతావరణం' }
            ],
            waterOptions: [
                { value: 'high', label: 'అధిక నీటి లభ్యత' },
                { value: 'medium', label: 'మధ్యస్థ నీటి లభ్యత' },
                { value: 'low', label: 'తక్కువ నీటి లభ్యత' }
            ]
        }
    };

    const getCropRecommendations = (soilType, climateType, waterAvailability, temperature) => {
        const recommendations = {
            clay: {
                tropical: {
                    high: ['Rice', 'Sugarcane', 'Jute'],
                    medium: ['Wheat', 'Maize', 'Sorghum'],
                    low: ['Millet', 'Sorghum']
                },
                temperate: {
                    high: ['Potato', 'Cabbage', 'Lettuce'],
                    medium: ['Wheat', 'Barley', 'Oats'],
                    low: ['Rye', 'Triticale']
                },
                arid: {
                    high: ['Date Palm', 'Cotton'],
                    medium: ['Chickpeas', 'Pigeon Peas'],
                    low: ['Millet', 'Sorghum']
                }
            },
            sandy: {
                tropical: {
                    high: ['Coconut', 'Cashew', 'Pineapple'],
                    medium: ['Groundnut', 'Cassava', 'Sweet Potato'],
                    low: ['Millet', 'Sorghum']
                },
                temperate: {
                    high: ['Carrot', 'Radish', 'Cucumber'],
                    medium: ['Potato', 'Turnip', 'Beetroot'],
                    low: ['Sunflower', 'Safflower']
                },
                arid: {
                    high: ['Date Palm', 'Pomegranate'],
                    medium: ['Groundnut', 'Sesame'],
                    low: ['Millet', 'Sorghum']
                }
            },
            loamy: {
                tropical: {
                    high: ['Banana', 'Papaya', 'Coffee'],
                    medium: ['Maize', 'Sugarcane', 'Cotton'],
                    low: ['Pearl Millet', 'Sorghum']
                },
                temperate: {
                    high: ['Apple', 'Pear', 'Plum'],
                    medium: ['Wheat', 'Barley', 'Corn'],
                    low: ['Rye', 'Buckwheat']
                },
                arid: {
                    high: ['Olive', 'Fig'],
                    medium: ['Chickpeas', 'Lentils'],
                    low: ['Millet', 'Sorghum']
                }
            }
        };

        const filterByTemperature = (crops) => {
            if (temperature < 10) {
                return crops.filter(crop => ['Wheat', 'Barley', 'Rye', 'Oats', 'Pear', 'Apple'].includes(crop));
            } else if (temperature > 35) {
                return crops.filter(crop => ['Millet', 'Sorghum', 'Date Palm', 'Groundnut', 'Cotton', 'Sesame'].includes(crop));
            }
            return crops;
        };

        const baseCrops = recommendations[soilType]?.[climateType]?.[waterAvailability] || [];
        return filterByTemperature(baseCrops);
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

    const fetchWeatherData = async (location) => {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

        try {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: location,
                    appid: apiKey,
                    units: 'metric'
                }
            });
            setWeatherData(response.data);
            setError('');
            return response.data;
        } catch (err) {
            setWeatherData(null);
            setError(err.response?.data?.message || 'Error fetching weather data.');
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setCropSuggestions([]);

        const { soilType, climate, waterAvailability, location } = formData;

        if (!soilType || !climate || !waterAvailability || !location) {
            setError('Please fill all fields.');
            setLoading(false);
            return;
        }

        const weatherData = await fetchWeatherData(location);

        if (weatherData) {
            const temperature = weatherData.main.temp;
            const recommendations = getCropRecommendations(
                soilType, 
                climate, 
                waterAvailability, 
                temperature
            );
            
            setCropSuggestions(recommendations);
        }

        setLoading(false);
    };

    return (
        <div className="farmers-container">
            <div className="form-container">
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

                    <div className="form-group farm-location-group">
                        <label>{translations[language].location}</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Enter your location"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : translations[language].submit}
                    </button>
                </form>

                {weatherData && (
                    <div className="weather-info">
                        <h3>Weather Data</h3>
                        <p>Temperature: {weatherData.main.temp}°C</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                    </div>
                )}

                {cropSuggestions.length > 0 && (
                    <div className="crop-suggestions">
                        <h3>Recommended Crops</h3>
                        <ul>
                            {cropSuggestions.map((crop, index) => (
                                <li key={index}>{crop}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default Farmers;