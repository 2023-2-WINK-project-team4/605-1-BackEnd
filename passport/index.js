const passport = require("passport");
const Member = require("../models/member");
const kakao = require('./kakaoStrategy');


module.exports = () => {
    passport.serializeUser((user, done) => { // 로그인 시 sesson 저장
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => { // 로그인 시 세션 불러오기.
        Member.findOne({ userId: id })
            .then(member => done(null, member)) // done(에러 발생 시 저장할 데이터, 성공 시 저장할 데이터)
            .catch(err => done(err));
    });

    kakao();
}

