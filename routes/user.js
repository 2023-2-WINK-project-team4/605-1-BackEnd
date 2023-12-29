const express = require('express');
const { editMember, getUser } = require('../controller/userController');
const multer = require("multer");

const router = express.Router();

const upload = multer({dest: 'profiles/'})

router.patch('/update', upload.single('profile'), editMember);

router.get('/', getUser);

router.get('/update', getUser);

module.exports = router;