const express = require('express')
const {home} = require('../controller/homeController')
const router = express.Router()


router.get('/main', home)

module.exports = router;