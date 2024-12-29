import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 30000,  // Increased timeout for ML operations
    withCredentials: false  // Set to false unless you specifically need credentials
});

// Add request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers
        });
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.data);
        return response;
    },
    (error) => {
        console.error('Response Error:', error.response || error);
        // Enhance error messages
        const errorMessage = error.response?.data?.error 
            || error.response?.data?.message 
            || error.message 
            || 'An error occurred while connecting to the server';
        return Promise.reject(new Error(errorMessage));
    }
);

export default api;
