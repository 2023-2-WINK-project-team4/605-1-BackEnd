const mongoose = require('mongoose');

const { Schema } = mongoose;

const seat = new Schema({
    number: {
        type: Number,
        required: true, // NotNull 속성.
        // unique: true, // 중복 x
    },
    club: {
        type: String,
        required: true,
        enum: ['wink', 'foscar']
    },
    status: { // 좌석 이용 상태
        type: String,
        required: true,
        enum: ['using', 'notUsed'],
        default: 'notUsed'
    },
    startTime: {
        type: Date,
        default: null, // 다큐먼트 생성 시 현재 시각으로
    },
    memberId: { // member의 _id 연결
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        default : null
        // required: true,
    }
});

seat.index({ club : 1, number: 1 }, {unique : true}); // 좌석 번호 오름차순.

module.exports = mongoose.model('Seat', seat);