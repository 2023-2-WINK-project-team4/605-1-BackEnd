const mongoose = require('mongoose');

const { Schema } = mongoose;

const seat = new Schema({
    number: {
        type: Number,
        required: true, // NotNull 속성.
        unique: true, // 중복 x
    },
    status: { // 좌석 이용 상태
        type: String,
        enum: ['using', 'notUsed'],
        default: 'notUsed'
    },
    startTime: {
        type: Date,
        default: Date.now, // 다큐먼트 생성 시 현재 시각으로
    },
    memberId: { // member의 _id 연결
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    }
});

seat.index({ number: 1 }); // 좌석 번호 오름차순.

module.exports = mongoose.model('Seat', seat);