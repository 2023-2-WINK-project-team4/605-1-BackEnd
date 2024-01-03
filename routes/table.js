const express = require('express');
const router = express.Router();
const {allTable , addTable} = require('../controller/tableController')


// 날짜 별 meetingTable 연결
router.get('/', allTable);
  
// meetingTable DB 추가
router.post('/addTable', addTable);

module.exports = router;