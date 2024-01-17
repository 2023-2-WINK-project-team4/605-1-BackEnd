const Member = require('../models/member');


// 회원 가입 로직
exports.join = async (req, res) => {
    try {
        // 받은 값으로 회원 가입 완료.
        await Member.updateOne({ _id: req.header.authorization }, {
            $set: {
                name: req.body.name,
                studentId: req.body.studentId,
                club: req.body.club,
            }
        });
        res.status(200).json({
            msg: '회원 가입 성공',
            redirect: '메인 화면'
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            redirect: '첫 화면'
        });
    }
};

// 로그아웃 로직
exports.logout = (req, res) => {
    req.logout();
}

// 로그인 콜백 로직
exports.loginCallback = async (req, res) => {
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

// const { generateToken } = require('../util/auth/jwtHelper'); // 경로에 주의하세요.

// 사용자의 카카오 로그인 후 받은 kakaoId를 통해 member 식별 후 token 생성
// exports.loginWithKakao = async (req, res) => {
//     const kakaoId = req.params.kakaoId;
//
//     try {
//         const member = await Member.findOne({ kakaoId: kakaoId });
//         if (!member) {
//             return res.status(404).json({ message: '회원을 찾을 수 없습니다.' });
//         }
//         const token = generateToken(member);
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };