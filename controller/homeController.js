const Seat = require("../models/seat");

exports.home = (req, res) => {
    try {
        const seat = Seat.findOne({memberId: req.user._id});
        if(seat) {
            res.status(200).json({
                "seat": seat.number
            })
        } else {
            res.status(200).json({
                "message": "이용 중인 좌석이 없습니다."
            })
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            "message": error.message
        });
    }
}