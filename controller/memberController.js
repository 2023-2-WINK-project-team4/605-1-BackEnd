exports.join = async (req, res) => {
    try {
        // 받은 값으로 회원 가입 완료.
        Member.updateOne( { kakaoId: req.body.kakaoId }, {
            $set: {
                name: req.body.name,
                studentId: req.body.studentId,
                club: req.body.club,
                profile: req.body.profile,
            }
        })
        res.status(200).json({
            "message": "회원 가입 성공",
            "redirect": "/main"
        }); // 회원 가입 성공 시 메인으로 리다이렉트
    } catch (error) {
        console.error(error);
        res.status(400).json({
            "message": error.message
        }); // 오류 발생 시 첫 화면으로 redirect
    }
}

