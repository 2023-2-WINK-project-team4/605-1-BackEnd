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
    const user = await req.token;

    const findOne = Member.findOne({kakaoId: user.kakaoId});

    try {
        if (findOne == null) res.status(500).send('Not exist Session')
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

    }
}

// 회원 정보 수정
exports.editMember = async (req, res, next) => {
    try {
        const user = await req.token;

        const member = await Member.updateOne({ kakaoId: user.kakaoId },
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
exports.getUser = async (req, res) => {
    try {
        const user = await req.token;

        const member = await Member.findOne({ kakaoId: user.kakaoId });
        const seat = await Seat.findOne({ memberId: member.id });

        res.json({
            member,
            seatNumber: seat.number
        })
    } catch (error) {
        console.log("접속 완료");
        console.error(error);
    }
}