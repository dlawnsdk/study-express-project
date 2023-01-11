var express = require('express');
var router = express.Router();
const util = require('../lib/middleware/util')
/* GET home page. */
router.get('/', function(req, res, next) {
  
  var agent = req.header('User-Agent')
  console.log("로그인 유저 브라우저 정보 === %s", agent)
  
  if(agent.toLowerCase().match(/edg/)){
    console.log("Edge로 접속 시도")
  }
  util.objtLog(req.session.account, "현재 로그인한 유저 정보 == ")
  res.render('index');

});

module.exports = router;

