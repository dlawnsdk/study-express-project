var express = require('express');
var router = express.Router();
const connection = require('../lib/dataBase')

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login')
});

router.post('/login/try', function(req, res, next){
  var login = {
    id: req.body.id,
    password: req.body.password
  }
  var id =  req.body.id
  var password = req.body.password
  connection.query(
      "SELECT idx, id, name from user WHERE id = ? and password = ?", [id, password]
  ).then((result) => {
      if(result[0][0] !== undefined){
          userIdx = result[0][0].idx
          console.log(userIdx)
          if(userIdx !== null){
              req.session.idx = result[0][0].idx,
              req.session.uid = result[0][0].id,
              req.session.name = result[0][0].name
              console.log(req.session)
              res.redirect('/')
          }else{
            res.send("아이디 또는 비밀번호가 잘못 되었습니다.")
          }
      }
  })
})

module.exports = router;
