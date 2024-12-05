import { useState, useEffect } from 'react';
import api from '../api/axios';

function TestConnection() {
    const [message, setMessage] = useState('Attempting to connect...');
    const [error, setError] = useState('');

    useEffect(() => {
        const testConnection = async () => {
            try {
                console.log('Attempting to connect to backend...');
                const response = await api.get('/test');
                console.log('Response:', response);
                setMessage(response.data.message);
            } catch (err) {
                console.error('Connection error details:', err);
                setError(`Connection failed: ${err.message}. Check console for details.`);
            }
        };

        testConnection();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Connection Test</h2>
            {message && <p style={{color: 'blue'}}>{message}</p>}
            {error && (
                <div style={{color: 'red'}}>
                    <p>{error}</p>
                    <p>Make sure:</p>
                    <ul>
                        <li>Backend is running on port 5000</li>
                        <li>CORS is properly configured</li>
                        <li>The /test endpoint exists in backend</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default TestConnection; 