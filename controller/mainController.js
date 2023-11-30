const Seat = require("../models/seat");

// 메인 화면 로직
exports.home = async (req, res) => {
    try {
        // req.user 및 req.user._id 확인
        if (!req.user || !req.user.kakaoId) {
            res.status(400).json({
                msg: "세션이 종료됐거나 사용자가 올바르지 않음."
            });
            return;
        }
        const seat = await Seat.findOne({ memberId: req.user.kakaoId });
        console.log("seat", seat);
        if (seat !== null) {
            res.status(200).json({
                seat: seat?.number
            });
        } else {
            res.status(200).json({
                message: "이용 중인 좌석이 없습니다."
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: error.message
        });
    }
}