import axios from 'axios';

// Get the API URL from environment variables, fallback to localhost for development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    // Optional: Add timeout
    timeout: 10000,
    // Optional: Add withCredentials if you're using cookies/sessions
    withCredentials: false
});

// Request interceptor with environment-aware logging
api.interceptors.request.use(request => {
    // Only log in development environment
    if (import.meta.env.DEV) {
        console.log('API Request:', {
            url: request.url,
            method: request.method,
            headers: request.headers,
            data: request.data
        });
    }
    return request;
}, error => {
    if (import.meta.env.DEV) {
        console.error('Request Error:', error);
    }
    return Promise.reject(error);
});

// Response interceptor with environment-aware logging
api.interceptors.response.use(
    response => {
        // Only log in development environment
        if (import.meta.env.DEV) {
            console.log('API Response:', {
                status: response.status,
                data: response.data,
                headers: response.headers
            });
        }
        return response;
    },
    error => {
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            if (import.meta.env.DEV) {
                console.error('Response Error:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
            }
        } else if (error.request) {
            // Request was made but no response received
            if (import.meta.env.DEV) {
                console.error('No Response Error:', {
                    request: error.request
                });
            }
        } else {
            // Error in request configuration
            if (import.meta.env.DEV) {
                console.error('Request Configuration Error:', {
                    message: error.message
                });
            }
        }
        return Promise.reject(error);
    }
);

export default api;