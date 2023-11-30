const express = require('express')
const {home} = require('../controller/mainController')
const router = express.Router()


router.get('/main', home) // 홈 화면

module.exports = router;