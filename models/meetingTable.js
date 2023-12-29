const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingTable = new Schema({
    member: {
        type: String,
        required: true,
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
    },
    club: {
        type: String,
        enum: ['WINK', 'FOSCAR'],
        required: true,
    }
})

meetingTable.index({ startTime: 1 }); // 시작 시간 오름차순.

module.exports = mongoose.model('MeetingTable', meetingTable);