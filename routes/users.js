var express = require('express');
var router = express.Router();
const util = require('../lib/middleware/util')
const connection = require('../lib/dataBase')
const crypto = require('crypto')

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
      "SELECT idx, id, name, password, salt from user WHERE id = ?", id
  ).then((result) => {
      // 로그인 성공
        if(result[0][0] !== undefined){
            console.log("1", result[0][0])
            let salt = result[0][0].salt
            const tryPw = util.createHashedPassword(password, salt)
            if(tryPw === result[0][0].password){
                req.session.account = result[0][0]
                return req.session.save(() => {
                    res.redirect('/')
                })
            }else{
                res.send("<script>alert('로그인에 실패 했습니다.'); location.href = '/login' </script>")
            }
          }
        // 로그인 실패
        else{
            res.send("<script>alert('로그인에 실패 했습니다.'); location.href = '/login' </script>")
          }
      })
})

router.get('/logout', function(req, res, next){
    req.session.destroy()
    res.send("<script> alert('로그아웃 되었습니다.'); location.href = '/'</script>")
})

router.get('/join', function(req, res, next){
    res.render('users/join')
})

router.post('/join/save', function(req, res, next){
    //const { password, salt } = util.createHashedPassword(req.body.password);
    const salt = util.createSalt()
    const hasedPw = util.createHashedPassword(req.body.password, salt)
    var id =  req.body.id
    var name = req.body.name
    connection.query(
        "SELECT COUNT(idx) as NUM from user WHERE id = ?", id
    ).then((result) => {
        console.log(result[0][0])
        if(result[0][0].NUM === 0){
            connection.query(
                "INSERT INTO USER ( ID, PASSWORD, NAME, SALT ) VALUES (?, ?, ?, ?)", [id, hasedPw, name, salt]
            ).then((result) => {
                res.redirect('/')
            })
        }else{
            res.send("<script>alert('존재하는 아이디 입니다.'); location.href='/join'</script>")
        }
    })
})

module.exports = router;
