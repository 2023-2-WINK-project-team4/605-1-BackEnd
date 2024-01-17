const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const { join, loginWithKakao, logout} = require('../controller/authController')

// 로그인 인가 요청
authRouter.get("/login", passport.authenticate("kakao"));

// 로그인 콜백 요청
authRouter.get(
    "/login/callback", passport.authenticate("kakao", {

    }), async (req, res) => {
        if (!req.user) {
            res.status(400).json({
                msg: "사용자가 존재하지 않음."
            })
        }
        if (req.user.name === null) {
            res.status(302).json({
                msg: "sign_up",
                _id: req.user.id,
            });
        } else {
            res.status(200).json({
                _id: req.user.id,
                club: req.user.club,
                msg: "success",
            })
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