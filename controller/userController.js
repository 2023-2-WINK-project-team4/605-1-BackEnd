const Member = require("../models/member");

exports.editMember = async (req, res, next) => {
    try {
        const member = await Member.updateOne({kakaoId: req.user.kakaoId}, {'$set':{name: req.body.name, profile: req.file.filename, club:req.body.club}});
        res.json(member);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try{
        const member = await Member.findOne({kakaoId : req.user.kakaoId});
        console.log(member)
        res.json(member)
    } catch (error){
        console.log("접속 완료");
        console.error(error);
        next(error);
    }
}