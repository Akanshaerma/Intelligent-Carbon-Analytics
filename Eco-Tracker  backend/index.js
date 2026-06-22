const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const carbonRoutes = require('./routes/carbon');
const authRoutes = require('./routes/auth'); // Auth route import kiya

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes Connect Kiye
app.use('/api/carbon', carbonRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/footprint', require('./routes/footprint'));

// Test Route
app.get('/', (req, res) => {
    res.send('Eco-Track Backend is Running! 🌿');
});

// Database Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected successfully! 🍃');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log('Database connection error: ', err));


    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTM5MzFmZjY5OTNkNTFlNDFlMjUwNjYiLCJpYXQiOjE3ODIxMzMzMTUsImV4cCI6MTc4MjczODExNX0.ECYWvSbXcuEyvYOgH7rVdGSzsk6UgSuXJ8QKFYAt3Ik