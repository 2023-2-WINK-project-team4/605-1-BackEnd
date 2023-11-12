const express = require('express')
const { createMember } = require('../controller')

const router = express.Router()

// 예시
// (이름, 학번, 소속) 폼 데이터 POST로 전송 이후 member 모델을 생성하는 예제 코드
router.route('/')
    .post(createMember)

module.exports = router;