const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingTable = new Schema({

    member: { // member 연결 (이름)
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['using', 'notUsed'],
        default: 'notUsed'
    },

    club: {
        type: String,
        enum: ['wink', 'foscar'],
        required: true,
    }
})

meetingTable.index({ startTime: 1 }); // 시작 시간 오름차순.

module.exports = mongoose.model('MeetingTable', meetingTable);