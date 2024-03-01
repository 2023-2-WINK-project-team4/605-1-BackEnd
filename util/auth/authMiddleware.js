// 인증 및 권한 부여를 위한 미들웨어
// 라우트 도달 전 사용자 정보(memberId) 획득

const { verifyToken } = require('./jwtHelper');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        req.token = verifyToken(token);
        // JWT 토큰 생성 시 사용자의 ID를 토큰의 payload에 포함시켰기 때문에
        // 검증할 때 해당 ID를 다시 추출할 수 있음
        return next();
    } catch (error) {
        if (error.name === 'TokenExpireError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        });
    }
};

module.exports = { authenticate };
