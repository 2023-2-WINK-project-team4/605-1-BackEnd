const Member = require('../models/member');


// 회원 가입 로직
exports.join = async (req, res) => {
    try {
        // 받은 값으로 회원 가입 완료.
        await Member.updateOne({ kakaoId: req.body.kakaoId }, {
            $set: {
                name: req.body.name,
                studentId: req.body.studentId,
                club: req.body.club,
                profile: req.file ? req.file.filename : null,
            }
        });
        res.status(200).json({
            msg: '회원 가입 성공',
            redirect: '/main'
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            redirect: '첫 화면'
        });
    }
};

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