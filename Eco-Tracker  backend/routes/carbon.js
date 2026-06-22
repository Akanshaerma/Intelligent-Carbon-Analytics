const express = require('express');
const router = express.Router();
const CarbonLog = require('../models/CarbonLog');
const calculateCarbon = require('../utils/calculator');
const protect = require('../middleware/authMiddleware'); // <-- 1. Middleware import kiya

// 1. ADD NEW LOG (Protected via middleware)
router.post('/add', protect, async (req, res) => { // <-- 2. protect function yahan lagaya
    try {
        const { category, amount } = req.body; // userId ab body se lene ki zaroorat nahi hai!

        // Validation
        if (!category || !amount) {
            return res.status(400).json({ message: 'Category and amount are required!' });
        }

        const co2Emitted = calculateCarbon(category, amount);

        // Create new log (req.user hume middleware ke token se mila hai)
        const newLog = new CarbonLog({
            userId: req.user, // <-- 3. Asli login user ki ID auto-save hogi
            category,
            amount,
            co2Emitted
        });

        const savedLog = await newLog.save();
        res.status(201).json({ message: 'Log added successfully! 🌿', data: savedLog });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// 2. GET ALL LOGS FOR A USER (Protected via middleware)
router.get('/my-logs', protect, async (req, res) => {
    try {
        // Token se jo user ID mili, usi ke saare logs fetch honge
        const logs = await CarbonLog.find({ userId: req.user }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;