const mongoose = require('mongoose');
const Seat = require("./seat");
const clubs = ['WINK', 'FOSCAR'];

const connect = () => {
    // 1. 개발 환경일 떄만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인할 수 있게 하는 부분
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    // 2. 몽구스와 몽고디비 연결
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'winkDB',
    });
};

// 3. 몽구스 커넥션의 이벤트 리스너
mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});


// 4. 초기 좌석 세팅
mongoose.connection.once('open', async () => {
    try {
        // 데이터베이스에서 이미 좌석이 있는지 확인
        const existingSeat = await Seat.findOne();
        if (existingSeat !== null) {
            console.log('좌석 데이터가 이미 존재합니다. 초기화 스크립트를 중단합니다.');
            return;
        }

        // 좌석 데이터 생성
        for (const club of clubs) {
            for (let number = 1; number <= 8; number++) {
                const seat = new Seat({
                    number,
                    club,
                    status: 'notUsed',
                });
                await seat.save();
            }
        }
        console.log('초기 좌석 생성 완료');
    } catch (error) {
        console.error('초기 좌석 생성 중 에러 발생:', error);
        mongoose.disconnect();
    }
});

module.exports = connect;