var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



// 컨트롤러(routs) 변수에 담기
var indexRouter = require('./routes/index');
// 유저 관리
var usersRouter = require('./routes/users');
// 자유세기판
var boardRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// URL 요청 받으면 컨트롤러 요청
app.use('/', indexRouter);
// 유저
app.get('/login', usersRouter);
app.post('/login/try', usersRouter);
// 게시판
app.get('/board', boardRouter);
app.get('/board/edit', boardRouter);
app.post('/board/save', boardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

