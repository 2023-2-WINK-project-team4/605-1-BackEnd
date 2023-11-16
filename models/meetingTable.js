const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingTable = new Schema({
    memberId: { // member의 _id 연결
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
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

meetingTable.index({ startTime: 1 }); // 시작 시간 오름차순.

module.exports = mongoose.model('MeetingTable', meetingTable);