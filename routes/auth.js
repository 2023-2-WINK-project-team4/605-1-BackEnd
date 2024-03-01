const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const { loginWithKakao, logout} = require('../controller/authController')
const Member = require("../models/member");
const jwt = require('jsonwebtoken')
const {generateToken} = require("../util/auth/jwtHelper");
const {authenticate} = require("../util/auth/authMiddleware");
require('dotenv').config()


// 로그인 인가 요청
authRouter.get("/login", passport.authenticate("kakao"));

// 로그인 콜백 요청
authRouter.get(
    "/login/callback", authenticate, passport.authenticate('kakao'), (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(400).json({
                    msg: "사용자가 존재하지 않음."
                })
            }

            if (user.name === null) {
                // 회원가입 페이지
                res.status(200).json({
                    msg : "sign_up",
                    kakaoId: user.kakaoId
                })
            } else {
                req.login(user, err => {
                    if (err) {
                        res.send(err);
                    }
                    const token = generateToken(user);
                    /*
                    * token = {
                    *   kakaoId: 1234,
                    *   club : wink,
                    *   name : 류건
                    * }
                    */
                    return res.status(200).json({
                        msg: "success",
                        token : token
                    })
                });
            }
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
);

// 로그아웃
authRouter.get('/logout', logout)

// 회원 가입 라우터
authRouter.post('/join',async (req, res, next) => {
    try {
        // 받은 값으로 회원 가입 완료.
        const user = await Member.updateOne({ kakaoId: req.body.kakaoId }, {
            $set: {
                name: req.body.name,
                studentId: req.body.studentId,
                club: req.body.club,
            }
        });

        req.login(user, (error) => { // 새로운 로그인 세션을 생성한다.
            if (error) {
                next(error);
            }
            const token = generateToken(user);
            /*
            * token = {
            *   kakaoId: 1234,
            *   club : wink,
            *   name : 류건
            * }
            */
            res.status(200).json({
                token : token,
                msg: "회원 가입 성공",
            })
        });
    } catch (error) {
        console.error(error);
        next(error)
    }
});

// 서비스 로그인 라우터
// authRouter.get('/login/service/:kakaoId', loginWithKakao);

module.exports = authRouter;