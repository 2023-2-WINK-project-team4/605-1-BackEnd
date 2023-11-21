const mongoose = require('mongoose');

const { Schema } = mongoose;

const seatHistory = new Schema({
    member: { // member_name
        type: String,
        required: true,
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    seatStartTime: {
        type: Date,
        default: Date.now,
    }
})

seatHistory.index({ seatStartTime: 1 });

module.exports = mongoose.model('SeatHistory', seatHistory)
