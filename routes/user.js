const express = require('express');
const passport = require('passport')
const { editMember, getUser, checkProfile} = require('../controller/userController');
const { uploadS3 } = require('../util/S3/config')

const router = express.Router();

router.route('/update', passport.authenticate('kakao'))
    .get(getUser)
    .patch(checkProfile , uploadS3.single('profile'), editMember);

router.get('/', passport.authenticate('kakao'), getUser);

module.exports = router;