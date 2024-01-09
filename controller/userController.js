const AWS = require('aws-sdk');
const Member = require("../models/member");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});


// 이전 프로필 사진 체크 후 삭제
exports.checkProfile = (req, res, next) => {
    const findOne = Member.findOne({ _id: req.user.id });

    if (findOne.profile) {
        const params = {
            Bucket: 'wink-2023-2-bucket',
            Key: findOne.profile.split('/').pop(), // 파일명만 추출
        };

        s3.deleteObject(params, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error deleting file from S3.');
            }

            next();
        });
    } else {
        next();
    }
}

// 회원 정보 수정
exports.editMember = async (req, res, next) => {
    try {
        const member = await Member.updateOne({ _id: req.user.id },
            {'$set':
                {
                    name: req.body.name,
                    profile: req.file.location,
                    club: req.body.club,
                    studentId: req.body.studentId
                }});
        res.json(member);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

// 회원 정보 조회
exports.getUser = (req, res) => {
    try{
        const member = Member.findOne({ _id : req.user.id } );
        console.log(member)
        res.json(member)
    } catch (error){
        console.log("접속 완료");
        console.error(error);
    }
}