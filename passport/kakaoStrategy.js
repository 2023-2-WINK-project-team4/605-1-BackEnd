const passport = require("passport");
const KakaoStrategy = require('passport-kakao').Strategy;

const Member = require('../models/member')

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_APIKEY, // 카카오에서 발급해주는 아이디
        callbackURL: process.env.REDIRECT_URL, // 카카오 인증 결과 라우터 주소
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // 기존에 카카오를 통해 회원 가입한 사용자가 있는지 조회
            const exUser = await Member.findOne({ kakaoId: profile.id });
            if (!exUser) { // 있으면 사용자 정보와 함께 done 함수를 호출하고 종료
                // 없으면 회원 가입 진행
                // 인증 후 콜백 라우터로 accessToken, refreshToken과 profile을 보냄.
                const newUser = await Member.create({
                    kakaoId: profile.id
                });
                return done(null, newUser);
            }
            return done(null, exUser);
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
}