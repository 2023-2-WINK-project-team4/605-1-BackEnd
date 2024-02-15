const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const { loginWithKakao, logout} = require('../controller/authController')
const Member = require("../models/member");


// 로그인 인가 요청
authRouter.get("/login", passport.authenticate("kakao"));

// 로그인 콜백 요청
authRouter.get(
    "/login/callback", passport.authenticate('kakao'), (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(400).json({
                    msg: "사용자가 존재하지 않음."
                })
            }
            if (user.name === null) {
                // 세션 생성
                req.session.kakaoId = user.kakaoId;
                return res.json({ msg: "sign_up" })
            } else {
                // 세션 생성
                req.session.kakaoId = user.kakaoId;
                return res.json({ msg: "success" })
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
authRouter.post('/join', passport.authenticate('kakao'), async (req, res) => {
    try {
        // const value = await req.session.kakaoId
        //
        // console.log(`세션 : ${await req.session.kakaoId}`)

        // 받은 값으로 회원 가입 완료.
        await Member.updateOne({ kakaoId: req.user.kakaoId }, {
            $set: {
                name: req.body.name,
                studentId: req.body.studentId,
                club: req.body.club,
            }
        });
        res.status(200).json({
            msg: '회원 가입 성공'
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message
        });
    }
});

// 서비스 로그인 라우터
// authRouter.get('/login/service/:kakaoId', loginWithKakao);

module.exports = authRouter;