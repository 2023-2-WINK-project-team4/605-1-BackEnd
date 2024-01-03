const mongoose = require('mongoose');

const { Schema } = mongoose;

const member = new Schema({
    name: {
        type: String,
        default: null
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
    profile: { // 사진 링크로 받기
        type: Object,
        default: null,
    },
    kakaoId: { // 로그인 시 회원 조회 기준 key
        type: String,
    },
    isAdmin: { // 관리자 분류 key
        type: Boolean,
        default: false
    }
});

member.index({ studentId: 1 }); // 학번 오름차순(1) ,내림차순은 -1로 설정.

module.exports = mongoose.model('Member', member);