const express = require('express');
const router = express.Router();
const seatController = require('../controller/seatController');

// 좌석 대여
router.patch('/rent', seatController.rentSeat);

// 좌석 반납
router.patch('/return', seatController.returnSeat); // POST 또는 PUT 메서드 사용 가능

// 좌석 현황 조회
router.get('/status/:club', seatController.getSeatStatus);

module.exports = router;