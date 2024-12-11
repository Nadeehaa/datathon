import axios from 'axios';
import { API_KEYS } from '../config';  // Ensure API keys are stored in config

// API instances
const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: { 
        appid: API_KEYS.WEATHER_API_KEY,
        units: 'metric'
    }
});

const agroApi = axios.create({
    baseURL: 'http://api.agromonitoring.com/agro/1.0',
    params: { 
        appid: API_KEYS.AGRO_API_KEY
    }
});

// API functions to fetch data
export const api = {
    async getCropData(formData) {
        try {
            console.log('Fetching data with the following parameters:', formData);

            // Get coordinates based on the selected climate
            const coordinates = getCoordinates(formData.climate);
            console.log('Using coordinates:', coordinates);

            // Fetch weather and soil data from APIs concurrently
            const [weatherResponse, soilResponse] = await Promise.all([
                weatherApi.get('/weather', {
                    params: { lat: coordinates.lat, lon: coordinates.lon }
                }),
                agroApi.get('/soil', {
                    params: { lat: coordinates.lat, lon: coordinates.lon }
                })
            ]);

            // Process weather and soil data
            const weatherData = processWeatherData(weatherResponse.data);
            const soilData = processSoilData(soilResponse.data);

            // Generate crop recommendations based on the data
            const cropRecommendations = generateCropRecommendations(weatherData, soilData, formData);

            const irrigationTips = getIrrigationRecommendations(soilData.moisture, weatherData.current, formData.waterAvailability);
            const fertilizerTips = getFertilizerRecommendations(formData.soilType, soilData);
            const cultivationTips = getCultivationRecommendations(formData.soilType);

            // Final response
            const result = {
                weather: weatherData,
                soil: soilData,
                recommendations: cropRecommendations,
                additionalRecommendations: {
                    irrigation: irrigationTips,
                    fertilizer: fertilizerTips,
                    cultivation: cultivationTips
                },
                weatherAlerts: weatherData.alerts
            };

            return result;

        } catch (error) {
            console.error('API Error:', error);
            throw new Error('An error occurred while fetching data.');
        }
    }
};

// Helper functions for processing data

// Get coordinates based on climate type
function getCoordinates(climate) {
    const coordinates = {
        'tropical': { lat: 17.3850, lon: 78.4867 }, // Example for Hyderabad
        'temperate': { lat: 28.6139, lon: 77.2090 }, // Example for Delhi
        'arid': { lat: 26.9124, lon: 75.7873 }       // Example for Jaipur
    };
    return coordinates[climate] || coordinates['tropical'];  // Default to tropical if climate is not found
}

// Process weather data from API
function processWeatherData(data) {
    return {
        current: {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            rainfall: data.rain?.['1h'] || 0,
            wind: data.wind.speed,
            description: data.weather[0].description
        },
        alerts: data.alerts || []
    };
}

// Process soil data from API
function processSoilData(data) {
    return {
        moisture: data.moisture || 0,
        temperature: data.t0 || 0
    };
}

// Example crop data structure to recommend crops
function generateCropRecommendations(weather, soil, conditions) {
    const cropDatabase = {
        rice: {
            optimal: { 
                temperature: { min: 22, max: 30 },
                soilTypes: ['loamy', 'clay'],
                waterNeeds: 'high',
                humidity: { min: 70, max: 90 }
            },
            market: { trend: 'upward', basePrice: 1000, profitMargin: 20 }
        },
        wheat: {
            optimal: { 
                temperature: { min: 10, max: 20 },
                soilTypes: ['loamy'],
                waterNeeds: 'medium',
                humidity: { min: 50, max: 70 }
            },
            market: { trend: 'stable', basePrice: 1500, profitMargin: 10 }
        },
        cotton: {
            optimal: { 
                temperature: { min: 25, max: 35 },
                soilTypes: ['loamy', 'clay'],
                waterNeeds: 'medium',
                humidity: { min: 40, max: 70 }
            },
            market: { trend: 'upward', basePrice: 2000, profitMargin: 15 }
        }
    };

    // Calculate crop scores based on weather, soil, and market trends
    const cropScores = Object.entries(cropDatabase).map(([cropName, data]) => {
        let score = 0;
        const { optimal, market } = data;

        if (weather.current.temperature >= optimal.temperature.min && weather.current.temperature <= optimal.temperature.max) score += 30;
        if (optimal.soilTypes.includes(conditions.soilType)) score += 25;
        if (conditions.waterAvailability === optimal.waterNeeds) score += 25;
        if (weather.current.humidity >= optimal.humidity.min && weather.current.humidity <= optimal.humidity.max) score += 20;
        if (market.trend === 'upward') score += 10;
        if (market.trend === 'stable') score += 5;

        score += market.profitMargin / 10;

        return {
            name: cropName,
            score,
            marketPrice: `₹${market.basePrice}/quintal`,
            marketTrend: market.trend,
            profitMargin: `${market.profitMargin}%`,
            yieldPrediction: calculateYield(cropName, score),
            tips: generateTips(cropName, conditions)
        };
    });

    return cropScores.sort((a, b) => b.score - a.score).slice(0, 3);  // Top 3 crops
}

// Calculate crop yield based on score
function calculateYield(cropName, score) {
    const baseYields = {
        rice: { min: 35, max: 60 },
        wheat: { min: 30, max: 50 },
        cotton: { min: 15, max: 25 },
        sugarcane: { min: 400, max: 700 },
        maize: { min: 25, max: 45 },
        pulses: { min: 8, max: 15 },
        groundnut: { min: 15, max: 25 },
        soybean: { min: 20, max: 35 }
    };

    const yieldRange = baseYields[cropName] || { min: 20, max: 40 };
    const scorePercentage = score / 100;
    const expected = yieldRange.min + (yieldRange.max - yieldRange.min) * scorePercentage;

    return {
        min: yieldRange.min,
        max: yieldRange.max,
        expected: Math.round(expected)
    };
}

// Generate tips based on crop type
function generateTips(cropName, conditions) {
    const generalTips = {
        rice: [
            "Maintain proper water level during growth stages",
            "Monitor for pest infestations regularly",
            "Apply fertilizer in split doses"
        ],
        wheat: [
            "Ensure proper seed spacing",
            "Control weeds in early growth stages",
            "Monitor soil moisture regularly"
        ],
        cotton: [
            "Regular pest monitoring is crucial",
            "Maintain optimal spacing between plants",
            "Time the harvest correctly"
        ],
        // Add more crops as needed
    };

    return generalTips[cropName] || [
        "Maintain proper irrigation schedule",
        "Monitor plant health regularly",
        "Follow recommended fertilizer application"
    ];
}

// Get irrigation recommendations based on soil moisture and water availability
function getIrrigationRecommendations(soilMoisture, weather, waterAvailability) {
    const recommendations = [];

    if (waterAvailability === 'low') {
        recommendations.push("Implement water conservation techniques");
        recommendations.push("Consider drought-resistant crops");
        recommendations.push("Use drip irrigation system");
    } else if (waterAvailability === 'medium') {
        recommendations.push("Schedule irrigation based on soil moisture");
        recommendations.push("Use mulch to retain moisture");
    } else {
        recommendations.push("Ensure proper drainage");
        recommendations.push("Monitor soil moisture to prevent waterlogging");
    }

    if (weather.temperature > 30) {
        recommendations.push("Water early morning or evening to reduce evaporation");
    }

    return recommendations;
}

// Get fertilizer recommendations based on soil type
function getFertilizerRecommendations(soilType, soil) {
    const recommendations = {
        'clay': [
            "Use slow-release fertilizers",
            "Apply organic matter to improve nutrient availability",
            "Split fertilizer applications to prevent leaching"
        ],
        'sandy': [
            "Split fertilizer applications into smaller doses",
            "Use organic fertilizers to improve soil structure",
            "Apply micronutrients as sandy soils may be deficient"
        ],
        'loamy': [
            "Balance NPK based on soil test",
            "Maintain organic matter content",
            "Regular soil testing recommended"
        ]
    };
    return recommendations[soilType] || recommendations['clay'];
}

// Get cultivation recommendations based on soil type
function getCultivationRecommendations(soilType) {
    const recommendations = {
        'clay': [
            "Deep plowing to improve drainage",
            "Add organic matter to improve soil structure",
            "Avoid working with wet soil",
            "Consider raised beds for better drainage"
        ],
        'sandy': [
            "Add organic matter to improve water retention",
            "Use mulch to reduce evaporation",
            "Consider cover crops",
            "Frequent but light irrigation"
        ],
        'loamy': [
            "Maintain soil structure with minimal tillage",
            "Rotate crops regularly",
            "Use organic mulch",
            "Practice conservation tillage"
        ]
    };
    return recommendations[soilType] || recommendations['clay'];
}

export default api;
