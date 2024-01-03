// 인증 및 권한 부여를 위한 미들웨어
// 라우트 도달 전 사용자 정보(memberId) 획득

const { verifyToken } = require('./jwtHelper');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token);
        // JWT 토큰 생성 시 사용자의 ID를 토큰의 payload에 포함시켰기 때문에
        // 검증할 때 해당 ID를 다시 추출할 수 있음
        req.memberId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: '인증 실패' });
    }
};

module.exports = { authenticate };
