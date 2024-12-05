import { useState, useEffect } from 'react';
import api from '../api/axios';

function ExampleComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/your-endpoint');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            const response = await api.post('/your-endpoint', formData);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* Your component JSX */}
        </div>
    );
} 