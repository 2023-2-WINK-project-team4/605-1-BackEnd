const mongoose = require('mongoose');

const connect = () => {
    // 1. 개발 환경일 떄만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 하는 부분
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    // 2. 몽구스와 몽고디비 연결
    // .env 파일에서 MONGO_URI를 각자 자기 mongodb 아이디 비밀번호로 설정하기!
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'winkDB',
    });
};

// 3. 몽구스 커넥션의 이벤트 리스너
mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
module.exports = connect;