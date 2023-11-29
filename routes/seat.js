const express = require('express');
const router = express.Router();
const seatController = require('../controller/seatController');

// 내 좌석 대여 조회
router.get('/my-seat', seatController.checkMySeat);

// 좌석 대여
router.patch('/rent', seatController.rentSeat);

// 좌석 반납
router.patch('/return', seatController.returnSeat); // POST 또는 PUT 메서드 사용 가능

// 좌석 조회
router.get('/:club', seatController.getSeatsStatus);

module.exports = router;