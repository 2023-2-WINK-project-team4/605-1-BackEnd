const express = require('express');
const passport = require('passport')
const router = express.Router();
const {checkMySeat, rentSeat, returnSeat, getSeatsStatus} = require('../controller/seatController');

// 내 좌석 대여 조회
router.get('/my-seat', checkMySeat);

// 좌석 대여
router.patch('/rent', rentSeat);

// 좌석 반납
router.patch('/return', returnSeat); // POST 또는 PUT 메서드 사용 가능

// 좌석 조회
router.get('/:club', getSeatsStatus);

module.exports = router;