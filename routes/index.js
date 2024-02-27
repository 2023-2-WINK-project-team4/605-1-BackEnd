const express = require('express')
const { uploadS3 } = require('../util/S3/config')
const s3Router = express.Router();

// s3 업로드 예시.
// s3Router.post('/', uploadS3.single('profile'), (req, res) => {
//     res.json(req.file);
// })

s3Router.get('/', (req, res) => {
    res.send(req.user);
})

module.exports = s3Router;