var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var agent = req.header('User-Agent')
  console.log("현재 로그인한 계정 정보 ===  " + req.session.idx, req.session.uid, req.session.name);
  console.log("로그인 유저 브라우저 정보 === %s", agent)
  
  if(agent.toLowerCase().match(/edg/)){
    console.log("Edge로 접속 시도")
  }
  
  const loginInfo = new Map()
  loginInfo.set("idx", req.session.idx)
  loginInfo.set("uid", req.session.uid)
  loginInfo.set("name", req.session.name)
  console.log("현재 로그인 유저 ===  " + loginInfo.get("name"));
  if(loginInfo.get("name") === undefined){
    res.render('index');
  }else{
    res.render('index', { loginInfo: loginInfo.get("uid") });
  }

});

module.exports = router;
