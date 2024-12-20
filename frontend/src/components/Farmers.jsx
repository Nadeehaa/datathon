import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Cell } from 'recharts';


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
    const [historicalWeather, setHistoricalWeather] = useState([]);
    const [marketTrends, setMarketTrends] = useState([]);

    const COLORS = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
        '#D4A5A5', '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4',
        '#FEE440', '#8AC926', '#FF99C8', '#FCF6BD', '#A8E6CF'
    ];

    const translations = {
        en: {
            languageLabel: 'Select Language',
            title: 'Crop Growing Recommendation System',
            soilType: 'Soil Type',
            climate: 'Climate Zone',
            waterAvailability: 'Water Resources',
            submit: 'Get Recommendations',
            location: 'Farm Location',
            weatherInfo: 'Weather Data',
            temperature: 'Temperature',
            weatherDesc: 'Weather',
            recommendedCrops: 'Recommended Crops',
            charts: {
                cropDistribution: 'Crop Distribution',
                weatherTrend: 'Weather Trends',
                marketTrend: 'Market Trends',
                temperature: 'Temperature',
                humidity: 'Humidity',
                price: 'Price',
                demand: 'Demand'
            },
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
            languageLabel: 'भाषा चुनें',
            title: 'फसल उगाने की सिफारिश प्रणाली',
            soilType: 'मिट्टी का प्रकार',
            climate: 'जलवायु क्षेत्र',
            waterAvailability: 'जल संसाधन',
            submit: 'सिफारिशें प्राप्त करें',
            location: 'खेत का स्थान',
            weatherInfo: 'मौसम की जानकारी',
            temperature: 'तापमान',
            weatherDesc: 'मौसम',
            recommendedCrops: 'अनुशंसित फसलें',
            charts: {
                cropDistribution: 'फसल वितरण',
                weatherTrend: 'मौसम प्रवृत्ति',
                marketTrend: 'बाजार प्रवृत्ति',
                temperature: 'तापमान',
                humidity: 'आर्द्रता',
                price: 'मूल्य',
                demand: 'मांग'
            },
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
            languageLabel: 'భాష ఎంచుకోండి',
            title: 'పంట పెంచే సిఫారసు సిస్టం',
            soilType: 'నేల రకం',
            climate: 'వాతావరణ మండలం',
            waterAvailability: 'నీటి వనరులు',
            submit: 'సిఫారసులు పొందండి',
            location: 'పొలం స్థానం',
            weatherInfo: 'వాతావరణ సమాచారం',
            temperature: 'ఉష్ణోగ్రత',
            weatherDesc: 'వాతావరణం',
            recommendedCrops: 'సిఫార్సు చేసిన పంటలు',
            charts: {
                cropDistribution: 'పంట పంపిణీ',
                weatherTrend: 'వాతావరణ ధోరణి',
                marketTrend: 'మార్కెట్ ధోరణి',
                temperature: 'ఉష్ణోగ్రత',
                humidity: 'తేమ',
                price: 'ధర',
                demand: 'డిమాండ్'
            },
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

    const handleLanguageChange = (e) => setLanguage(e.target.value);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=e4401fdb46371d171e9dce7e735b55e7&units=metric`
            );
            if (!response.ok) throw new Error('Weather API error');
            const data = await response.json();
            setWeatherData(data);
            return data;
        } catch (err) {
            setError('Failed to fetch weather data.');
            return null;
        }
    };

    const generateHistoricalWeather = () => {
        const baseTemp = weatherData?.main?.temp || 25;
        setHistoricalWeather(
            Array.from({ length: 7 }, (_, i) => ({
                day: `Day ${i + 1}`,
                temperature: Math.round(baseTemp + Math.random() * 6 - 3),
                humidity: Math.round(60 + Math.random() * 20)
            }))
        );
    };

    const generateMarketTrends = (crops) => {
        setMarketTrends(
            crops.map(crop => ({
                name: crop,
                price: Math.round(100 + Math.random() * 900),
                demand: Math.round(50 + Math.random() * 50)
            }))
        );
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

        try {
            const weather = await fetchWeatherData(location);
            if (weather) {
                const temperature = weather.main.temp;
                const recommendations = getCropRecommendations(soilType, climate, waterAvailability, temperature);
                setCropSuggestions(recommendations);
                generateHistoricalWeather();
                generateMarketTrends(recommendations);
            }
        } catch (err) {
            setError('Failed to process request.');
        } finally {
            setLoading(false);
        }
    };

    const CropDistributionChart = () => (
        <div className="chart-container">
            <h3>{translations[language].charts.cropDistribution}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={cropSuggestions.map((crop, index) => ({
                            name: crop,
                            value: Math.round(Math.random() * 100),
                            fill: COLORS[index % 3] // Cycle through 3 distinct colors
                        }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {cropSuggestions.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % 3]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
    

    const WeatherTrendChart = () => (
        <div className="chart-container">
            <h3>{translations[language].charts.weatherTrend}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalWeather}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                    <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    const MarketTrendChart = () => (
        <div className="chart-container">
            <h3>{translations[language].charts.marketTrend}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="price" fill="#8884d8" />
                    <Bar dataKey="demand" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
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
 


    return (
        <div className="farmers-container">
            <div className="form-container">
                <div className="language-selector">
                <span className="select-label">{translations[language].languageLabel}</span> 
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
                    <div className="results-container">
                        <div className="crop-suggestions">
                            <h3>Recommended Crops</h3>
                            <ul>
                                {cropSuggestions.map((crop, index) => (
                                    <li key={index}>{crop}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Added chart components */}
                        <div className="charts-container">
                            <CropDistributionChart />
                            <WeatherTrendChart />
                            <MarketTrendChart />
                        </div>
                    </div>
                )}

                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default Farmers;