const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const cors = require('cors');
const { join, loginWithKakao, logout} = require('../controller/authController')

authRouter.use(cors());


// 로그인 인가 요청
authRouter.get("/login", passport.authenticate("kakao"));

// 로그인 콜백 요청
authRouter.get(
    "/login/callback", passport.authenticate('kakao'), async (req, res) => {
        try {
            const user = await req.user;

            if (!user) {
                return res.status(400).json({
                    msg: "사용자가 존재하지 않음."
                })
            }
            if (user.name === null) {
                return res.json({ msg: "sign_up" })
            } else {
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
authRouter.route('/join', passport.authenticate('kakao'))
    .post(join);

// 서비스 로그인 라우터
// authRouter.get('/login/service/:kakaoId', loginWithKakao);

module.exports = authRouter;