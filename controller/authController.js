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
                profile: req.file.filename,
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
