const Member = require("../models/member");

exports.createMember = async (req, res, next) => {
    try {
        const member = await Member.create({
            name: req.body.name,
            studentId: req.body.studentId,
            club: req.body.club
        });
        res.json(member);
    } catch (err) {
        console.error(err);
        next(err);
    }
}