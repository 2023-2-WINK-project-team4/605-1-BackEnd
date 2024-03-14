const AWS = require('aws-sdk');
const Member = require("../models/member");
const Seat = require("../models/seat")

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});


// 이전 프로필 사진 체크 후 삭제
exports.checkProfile = async (req, res, next) => {
    const findOne = Member.findOne({ kakaoId: req.token.kakaoId });

    try {
        if (findOne === null) res.status(401).send('Not exist token')
        else if (findOne.profile !== null) { // 기존 프로필이 있는 경우 해당 user의 프로필 사진 삭제.
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
    } catch (e) {
        next(e);
    }
}

// 회원 정보 수정
exports.editMember = async (req, res, next) => {
    try {
        const member = await Member.updateOne({ kakaoId: req.token.kakaoId }, {
               $set: {
                    name: req.body.name,
                    profile: req.file.location ? req.file.location : null,
                    club: req.body.club,
                    studentId: req.body.studentId
                }});
        return res.status(200).json(member);
    } catch (err) {
        next(err);
    }
}

// 회원 정보 조회
exports.getUser = async (req, res, next) => {
    try {
        const member = await Member.findOne({ kakaoId: req.token.kakaoId });
        const seat = await Seat.findOne({ memberId: member._id });

        return res.status(200).json({
            member,
            seatNumber: seat ? seat.number : null
        })
    } catch (error) {
        next(error)
    }
}