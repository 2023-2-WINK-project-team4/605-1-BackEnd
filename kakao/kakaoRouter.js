const express = require('express')
const router = express.Router();
const axios = require('axios')
const qs = require("qs");

router.get("/auth/login/callback", async (req, res) => {
    /* access token 발급 */
    try {
        const token = await axios({
            method: "POST",
            url: "https://kauth.kakao.com/oauth/token",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify({
                grant_type: "authorization_code",
                client_id: process.env.CLIENT_ID,
                redirectUri: process.env.REDIRECT_URL,
                code: req.query.code,
            }),
        });
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;