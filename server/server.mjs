import express from 'express';
import cors from 'cors';
import connectDB from './db.mjs';
import authRoutes from './routes/authRoutes.mjs'

const app = express()
// app.use(express.json())
app.use(cors())

// connectDB();

app.use('/auth', authRoutes)
app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.listen(8080, () => console.log('API is run on http://localhost:8080/login'))