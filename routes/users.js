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
      "SELECT COUNT(name) as num from user WHERE id = ? and password = ?", [id, password]
  ).then((result) => {
      userCount = result[0][0].num
      console.log(userCount)
      if(userCount === 1){
        res.redirect('/')
      }else{
        console.log("없는 계정")
      }
  })
})

module.exports = router;
