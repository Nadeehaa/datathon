import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000',  // Make sure this matches your backend port
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api; 