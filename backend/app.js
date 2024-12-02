import cors from 'cors';

app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true
})); 

app.get('/test', (req, res) => {
    res.json({ message: 'Backend connected successfully!' });
}); 