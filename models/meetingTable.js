const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingTable = new Schema({
    member: { // member 연결 (이름)
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
    club: { // club 연결
        type: String,
        required: true,
    }
})

meetingTable.index({ startTime: 1 }); // 시작 시간 오름차순.

module.exports = mongoose.model('MeetingTable', meetingTable);