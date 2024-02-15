const express = require('express')
const connect = require('./models');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const passportConfig = require('./passport')
const cors = require('cors');
// jwt 미적용
// const { authenticate } = require('./util/auth/authMiddleware');


require('dotenv').config();


// 라우터 import
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const seatRouter = require('./routes/seat');
const tableRouter = require('./routes/table')
const reportRouter = require("./routes/report");


// express 실행
const app = express();

app.set("port", process.env.PORT || 8080);

passportConfig(); // passport 설정
connect(); // mongoose 접속


// 미들웨어 실행
app.use(morgan("dev")); // morgan 실행
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 연결
app.use(express.json()); // json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 세션 만료 기간 - 일주일
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
  })
);

// passport-kakao 연결
app.use(passport.initialize());
app.use(passport.session());


// Router 연결
app.use("/user", userRouter);
app.use('/auth', authRouter);
// app.use('/seat', authenticate, seatRouter); // jwt 사용
app.use('/seat', seatRouter);
app.use('/table',tableRouter)
app.use('/report', reportRouter);


// 에러 라우터 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 로깅 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("네트워크 에러 발생");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
