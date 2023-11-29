const Seat = require('../models/seat');
const SeatHistory = require('../models/seatHistory');
const Member = require('../models/member');

exports.rentSeat = async (req, res) => {
    const { seatNumber } = req.body;
    const memberId = req.memberId;

    try {
        // 현재 인증된 사용자의 정보를 조회
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: '회원을 찾을 수 없습니다.' });
        }

        // 해당 좌석을 조회
        const seat = await Seat.findOne({ number: seatNumber, club: member.club });
        if (!seat) {
            return res.status(404).json({ message: '좌석을 찾을 수 없습니다.' });
        }

        // 좌석이 이미 사용 중인 경우
        if (seat.status === 'using') {
            return res.status(400).json({ message: '이미 사용 중인 좌석입니다.' });
        }

        // 좌석 상태 업데이트
        seat.status = 'using';
        seat.startTime = new Date();
        seat.memberId = memberId;
        await seat.save();

        res.status(200).json({ message: '좌석 대여 완료' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류' });
    }
};

exports.returnSeat = async (req, res) => {
    // 좌석 반납 로직
};

exports.getSeatStatus = async (req, res) => {
    // 좌석 현황 조회 로직
};
