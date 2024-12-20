export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API_KEYS = {
    WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY || 'your_openweathermap_api_key_here',
    AGRO_API_KEY: import.meta.env.VITE_AGRO_API_KEY || 'your_agromonitoring_api_key_here'
};