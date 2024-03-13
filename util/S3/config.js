const multer = require('multer')
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require("path");


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

// S3 configuration
exports.uploadS3 = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'wink-2023-2-bucket',
        key(req, file, cb) {
            cb(null, `profiles/${Date.now()}_${path.basename(file.originalname)}`);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});