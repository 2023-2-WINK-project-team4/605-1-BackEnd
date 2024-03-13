const mongoose = require('mongoose');

const { Schema } = mongoose;

const seat = new Schema({
    number: {
        type: Number,
        required: true, // NotNull 속성.
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
        default: null,
    },
    memberId: { // member FK
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        default : null
    }
});

seat.index({ club : 1, number: 1 }, {unique : true}); // 좌석 번호 오름차순.

module.exports = mongoose.model('Seat', seat);