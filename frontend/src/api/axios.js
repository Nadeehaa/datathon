import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

console.log('Backend URL:', baseURL); 

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    withCredentials: true
});

export default api;