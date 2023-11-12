const mongoose = require('mongoose');

const { Schema } = mongoose;

const member = new Schema({
    name: {
        type: String,
        required: true, // NotNull 속성.
    },
    studentId: {
        type: Number,
        required: true,
        unique: true,
    },
    club: {
        type: String,
        required: true,
        enum: ['wink', 'foscar']
    },
    profile: { // 사진 링크로 받기
        type: String,
    },
    isAdmin: {
        type: Boolean,
    }
});

member.index({ studentId: 1 }); // 학번 오름차순(1) ,내림차순은 -1로 설정.

module.exports = mongoose.model('Member', member);