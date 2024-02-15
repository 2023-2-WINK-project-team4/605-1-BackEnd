const Report = require('../models/report');

// 신고 데이터 입력.
exports.create = async (req, res) => {
    try {
        const user = await req.user;

        const report = await Report.create({
            reporter: user.name,
            reported: req.body.name,
            seatNumber: req.body.seatNumber,
            comment: req.body.comment
        })
        res.status(200).json({ msg : "신고 완료"})
    } catch (error) {
        res.status(500).json( { msg : error} );
    }
}