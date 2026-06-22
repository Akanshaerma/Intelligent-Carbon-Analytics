const express = require('express');
const router = express.Router();
// Agar aapke paas auth middleware hai toh thik, nahi toh abhi bina auth ke simple save karte hain
const mongoose = require('mongoose');

// Ek temporary Schema schema bana lete hain agar pehle se nahi hai
const FootprintSchema = new mongoose.Schema({
    transport: Number,
    electricity: Number,
    food: Number,
    totalFootprint: Number,
    createdAt: { type: Date, default: Date.now }
});

const Footprint = mongoose.models.Footprint || mongoose.model('Footprint', FootprintSchema);

// POST request to save footprint
router.post('/', async (req, res) => {
    try {
        const { transport, electricity, food, totalFootprint } = req.body;
        const newFootprint = new Footprint({ transport, electricity, food, totalFootprint });
        await newFootprint.save();
        res.status(201).json({ message: 'Footprint saved successfully!', data: newFootprint });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// GET request to fetch all footprints
router.get('/', async (req, res) => {
    try {
        // Saari history latest date ke hisab se sorting ke sath nikalenge
        const history = await Footprint.find().sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;