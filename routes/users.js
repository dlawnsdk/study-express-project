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
      // 로그인 성공
        if(result[0][0] !== undefined){
            req.session.account = result[0][0]
            return req.session.save(() => {
                res.redirect('/')
            })

          }
        // 로그인 실패
        else{
            res.send("<script>alert('로그인에 실패 했습니다.'); location.href = '/login' </script>")
          }
      })
})

module.exports = router;
