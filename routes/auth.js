const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const { join, loginWithKakao, logout, loginCallback} = require('../controller/authController')

// 로그인 인가 요청
authRouter.get("/login", passport.authenticate("kakao"));

// 로그인 콜백 요청
authRouter.get("/login/callback", passport.authenticate("kakao", {}, loginCallback));

// 로그아웃
authRouter.get('/logout', logout)

// 회원 가입 라우터
authRouter.post('/join', join);

// 서비스 로그인 라우터
// authRouter.get('/login/service/:kakaoId', loginWithKakao);

module.exports = authRouter;