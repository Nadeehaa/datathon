export const API_URL = 'http://localhost:5001';
export const API_KEYS = {
    WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY || 'your_openweathermap_api_key_here',
    AGRO_API_KEY: import.meta.env.VITE_AGRO_API_KEY || 'your_agromonitoring_api_key_here'
}; 