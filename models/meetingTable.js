const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingTable = new Schema({
    memberId: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['using', 'notUsed'],
        default: 'notUsed'
    }
})

module.exports = mongoose.model('MeetingTable', meetingTable);