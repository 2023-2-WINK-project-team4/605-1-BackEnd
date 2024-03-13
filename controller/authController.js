const Member = require('../models/member');

// 로그아웃 로직
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
    });
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
    });
}