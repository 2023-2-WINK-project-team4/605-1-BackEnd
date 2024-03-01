const express = require('express')
const passport = require('passport')
const { create } = require("../controller/reportController");
const {authenticate} = require("../util/auth/authMiddleware");
const reportRouter = express.Router();

// 신고하기
reportRouter.post('/', create);

module.exports = reportRouter;