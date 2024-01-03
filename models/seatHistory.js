const mongoose = require('mongoose');

const { Schema } = mongoose;

const seatHistory = new Schema({
    memberName: { // member_name
        type: String,
        required: true,
    },
    studentId: {
        type: Number,
        default: null,
    },
    club: {
        type: String,
        default: null,
        enum: ['wink', 'foscar']
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    seatStartTime: {
        type: Date,
        default: null,
    },
    seatEndTime: {
        type: Date,
        default: Date.now,
    },
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        default : null
    }
})

seatHistory.index({ seatStartTime: 1 });

module.exports = mongoose.model('SeatHistory', seatHistory)
