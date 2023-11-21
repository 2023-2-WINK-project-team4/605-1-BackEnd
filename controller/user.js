const Member = require("../models/member");

exports.editMember = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log(req.file);
        const member = await Member.updateOne({studentId: req.body.studentId}, {'$set':{name: req.body.name, profile: req.body.profile, club:req.body.club}});
        console.log(req.body.profile);
        res.json(member);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try{
        const member = await Member.findOne({studentId : 1234});
        console.log(member)
        res.json(member)
    } catch (error){
        console.log("접속 완료");
        console.error(error);
        next(error);
    }
}