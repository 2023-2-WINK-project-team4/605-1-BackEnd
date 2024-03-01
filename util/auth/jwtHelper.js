const jwt = require('jsonwebtoken');
require('dotenv').config();

// 토큰 생성
const generateToken = (member) => {
    return jwt.sign({ kakaoId: member.kakaoId, club: member.club, name: member.name}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// 토큰 유효성 검증
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
