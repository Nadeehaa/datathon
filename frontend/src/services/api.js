import axios from 'axios';
import { API_KEYS } from '../config';

const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: { 
        appid: API_KEYS.WEATHER_API_KEY,
        units: 'metric'  // for Celsius
    }
});

const agroApi = axios.create({
    baseURL: 'http://api.agromonitoring.com/agro/1.0',
    params: { 
        appid: API_KEYS.AGRO_API_KEY
    }
});

export const farmerService = {
    async getCropData(formData) {
        try {
            // Using Hyderabad coordinates as example
            const lat = 17.3850;
            const lon = 78.4867;

            // Get data from both APIs
            const [weatherResponse, soilResponse] = await Promise.all([
                weatherApi.get(`/weather`, {
                    params: { lat, lon }
                }),
                agroApi.get(`/soil`, {
                    params: { lat, lon }
                })
            ]);

            console.log('Weather API Response:', weatherResponse.data);
            console.log('Agro API Response:', soilResponse.data);

            return {
                weather: {
                    current: {
                        temperature: weatherResponse.data.main.temp,
                        humidity: weatherResponse.data.main.humidity,
                        rainfall: weatherResponse.data.rain?.['1h'] || 0,
                        wind: weatherResponse.data.wind.speed,
                        description: weatherResponse.data.weather[0].description
                    }
                },
                soil: {
                    moisture: soilResponse.data.moisture || 0,
                    temperature: soilResponse.data.t0 || 0
                },
                predictions: {
                    yield: calculateYield(weatherResponse.data, soilResponse.data, formData),
                    confidence: 85
                },
                recommendations: generateRecommendations(weatherResponse.data, soilResponse.data, formData)
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};

function calculateYield(weather, soil, formData) {
    return {
        expected: 2500,
        minimum: 2000,
        maximum: 3000,
        unit: "kg/acre"
    };
}

function generateRecommendations(weather, soil, formData) {
    return {
        cultivation: [
            "Plant seeds 3-4 inches deep",
            "Maintain row spacing of 30cm",
            "Use organic mulch for moisture retention"
        ],
        irrigation: [
            "Water deeply twice a week",
            "Monitor soil moisture regularly"
        ],
        fertilizer: [
            "Apply NPK 14-14-14 every 15 days",
            "Use organic compost as base fertilizer"
        ]
    };
}

export default farmerService;
