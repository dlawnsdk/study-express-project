var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
/*const fileStore = require('session-file-store')(session)*/
var memoryStore = require('memorystore')(session)
const redis = require('redis')
const client = redis.createClient(6379, "localhost");
const hbs = require('hbs')
const app = express();

// Web Socket
app.io = require('socket.io')();

app.io.on('connection', function(socket){
  console.log("연결 되었습니다.")

  socket.on('disconnect', () => {
    console.log('연결 해제 되었습니다.')
  })

  // view에서 request한 메시지를 받는다.
  socket.on('chat-msg-1', (msg, sender) => {
      console.log(JSON.stringify(memoryStore))
    // 해당 메시지를 다시 view로 response 한다.
    app.io.emit('chat-msg-2', msg);
  });
})


// 세션 설정
app.use(
    session({
        secret :'asdjha!@#@#$dd',
        resave:false,
        saveUninitialized:true
    })
)

// 컨트롤러(routs) 변수에 담기
var indexRouter = require('./routes/index');
// 유저 관리
var usersRouter = require('./routes/users');
// 자유게기판
var boardRouter = require('./routes/board');
//채팅
var chatRouter = require('./routes/chat');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// view engine을 hbs로 세팅
app.set('view engine', 'hbs');
// handlebars 사용할 때 inc 키워드를 붙이면 실행되는 함수
hbs.registerHelper("count", function(value, options)
{
  return parseInt(value) + 1;
});

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
app.get('/board/view', boardRouter);
app.get('/board/remove', boardRouter)
// 채팅
app.get('/chat', chatRouter);

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

