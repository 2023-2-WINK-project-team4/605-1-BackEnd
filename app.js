const express = require('express')
const connect = require('./models');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const passportConfig = require('./passport')


require('dotenv').config();


// router import
const indexRouter = require('./routes')

const authRouter = require("./routes/auth");



// express 실행
const app = express();

app.set('port', process.env.PORT || 8080)

passportConfig(); // passport 설정
connect(); // mongoose 접속


// 미들웨어 실행
app.use(morgan('dev')); // morgan 실행
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 연결
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());


// set Router
app.use('/', indexRouter)

app.use('/auth', authRouter);


// 에러 라우터 미들웨어
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 로깅 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('네트워크 에러 발생');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});