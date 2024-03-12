const express = require('express');
const passport = require('passport')
const router = express.Router();
const {checkMySeat, rentSeat, returnSeat, getSeatsStatus} = require('../controller/seatController');
const {authenticate} = require("../util/auth/authMiddleware");

// 내 좌석 대여 조회
router.get('/my-seat', authenticate, checkMySeat);

// 좌석 대여
router.patch('/rent', authenticate, rentSeat);

// 좌석 반납
router.patch('/return', authenticate, returnSeat); // POST 또는 PUT 메서드 사용 가능

// 좌석 조회
router.get('/:club', getSeatsStatus);

module.exports = router;