const passport = require("passport");
const kakao = require('./kakaoStrategy');


module.exports = () => {
    kakao();

    passport.serializeUser((user, done) => { // 로그인 시 session 저장
        done(null, user);
    });

    passport.deserializeUser((id, done) => { // 로그인 시 세션 불러오기. req.user로 접근 가능!
        done(null, id);
    });
}