const express = require('express')
const passport = require('passport')
const multer = require('multer')

const authRouter = express.Router()
const { join } = require('../controller/authController')
const upload = multer({ dest: 'profiles/' })

let kakaoId = null;

// 로그인 인가 요청
authRouter.get("/login", passport.authenticate("kakao"));

authRouter.get(
    "/login/callback", passport.authenticate("kakao", {

    }), async (req, res) => {
        if (!req.user) {
            res.status(400).json({
                msg: "사용자가 존재하지 않음."
            })
        }
        if (req.user.name === null) {
            kakaoId = req.user.kakaoId;
            res.status(302).json({
                msg: "sign_up",
                redirect: "/auth/join",
            });
        } else {
            res.status(200).json({
                userId: req.user._id,
                club: req.user.club,
                msg: "success",
            })
        }
    }
);


// 회원 가입 라우터
authRouter.route('/join')
    .get((req, res) => {
        try{
            if(kakaoId !== null) {
                res.json({
                    kakaoId: kakaoId
                })
            } else res.status(400).send("카카오 아이디가 없음")
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message: error.message
            });
        }
    })
    .post(upload.single('profile'), join);

module.exports = authRouter;