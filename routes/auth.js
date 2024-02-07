const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
authRouter.use(cors());
const { join, loginWithKakao, logout} = require('../controller/authController')

// 로그인 인가 요청
authRouter.get("/login", passport.authenticate("kakao"));

// 로그인 콜백 요청
authRouter.get(
    "/login/callback", passport.authenticate('kakao', {
        failureRedirect: '/'
    }), async (req, res) => {
        try {
            const user = await req.user;

            if (!user) {
                return res.status(400).json({
                    msg: "사용자가 존재하지 않음."
                })
            }
            if (user.name === null) {
                // res.redirect(302, 'http://43.201.38.170:8080/auth/join')
                // res.redirect(302, '/auth/join')
                return res.json({ msg: "sign_up" })
            } else {
                // res.redirect(302, '/main');
                return res.json({msg: "success"})
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
);

// 로그아웃
authRouter.get('/logout', logout)

// 회원 가입 라우터
authRouter.route('/join')
    .post(join);

// 서비스 로그인 라우터
// authRouter.get('/login/service/:kakaoId', loginWithKakao);

module.exports = authRouter;