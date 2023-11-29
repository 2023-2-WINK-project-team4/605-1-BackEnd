const { verifyToken } = require('./jwtHelper');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token);
        req.memberId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: '인증 실패' });
    }
};

module.exports = { authenticate };
