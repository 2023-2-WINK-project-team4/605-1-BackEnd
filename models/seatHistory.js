const mongoose = require('mongoose');

const { Schema } = mongoose;

const seatHistory = new Schema({
    studentId: {
        type: Number,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    seatStartTime: {
        type: Date,
        default: Date.now
    }
})

seatHistory.index({ seatStartTime: 1 });

module.exports = mongoose.model('SeatHistory', seatHistory)