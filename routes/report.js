const express = require('express')
const { create } = require("../controller/reportController");
const reportRouter = express.Router();

// 신고하기
reportRouter.post('/', create);

module.exports = reportRouter;