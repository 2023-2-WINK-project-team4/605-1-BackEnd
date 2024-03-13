const Report = require('../models/report');

// 신고 데이터 입력.
exports.create = async (req, res, next) => {
    try {
        const report = await Report.create({
            reporter: req.token.name,
            reported: req.body.name,
            seatNumber: req.body.seatNumber,
            comment: req.body.comment
        })
        res.status(200).json({ msg : "신고 완료"})
    } catch (error) {
        next(error)
    }
}