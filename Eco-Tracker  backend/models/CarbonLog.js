const mongoose = require('mongoose');

const CarbonLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        enum: ['transport', 'electricity', 'food'] // Sirf yahi 3 categories allowed hain
    },
    amount: {
        type: Number,
        required: true // Jaise: km traveled, ya units of electricity consumed
    },
    co2Emitted: {
        type: Number,
        required: true // Yeh hum logic laga kar calculate karenge
    }
});

module.exports = mongoose.model('CarbonLog', CarbonLogSchema);