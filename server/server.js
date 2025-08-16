require('dotenv').config(); // .env variables ko load karein
const express = require('express');
const dbPool = require('./config/database'); // Apne database connection ko import karein
const serviceRoutes = require('./src/api/services.routes.js'); // << --- 1. YEH LINE ADD KAREIN
const authRoutes = require('./src/api/auth.routes.js');
const userRoutes = require('./src/api/users.routes.js');
const cors = require('cors');
const appointmentRoutes = require('./src/api/appointments.routes.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); 
app.use(express.json()); // << --- 2. YEH LINE ADD KAREIN (JSON samajhne ke liye)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// Ek test route yeh check karne ke liye ki DB connection kaam kar raha hai ya nahi
app.get('/ping', async (req, res) => {
    try {
        const [results] = await dbPool.query("SELECT 'pong' as result");
        res.json(results[0]);
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).send("Database Error");
    }
});

// Service routes ko istemal karein
app.use('/api/services', serviceRoutes); // << --- 3. YEH LINE ADD KAREIN

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});