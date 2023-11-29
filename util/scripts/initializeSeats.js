// 초기 좌석 생성 함수
// 동아리 별 1~8까지 번호를 갖는 좌석 생성
// 수동으로 실행 'node ./util/scripts/initializeSeats.js'

const mongoose = require('mongoose');
const Seat = require('../../models/seat');

mongoose.connect('mongodb://localhost:27017/winkDB')

const clubs = ['wink', 'foscar'];

async function createInitialSeats() {
    try {
        // 데이터베이스에서 이미 좌석이 있는지 확인
        const existingSeat = await Seat.findOne();
        if (existingSeat) {
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
    } finally {
        mongoose.disconnect();
    }
}

createInitialSeats();
