const passport = require("passport");
const Member = require("../models/member");
const kakao = require('./kakaoStrategy');


module.exports = () => {
    passport.serializeUser((user, done) => { // 로그인 시 session 저장
        done(null, user.kakaoId);
    });

    passport.deserializeUser((id, done) => { // 로그인 시 세션 불러오기. req.user로 접근 가능!
        Member.findOne({ kakaoId: id })
            .then(member => done(null, member))
            .catch(err => done(err));
    });

    kakao();
}