var express = require('express');
var router = express.Router();

router.get('/board', function(req, res, next){
    console.log("test " + req)
    res.render('board', { title: '자유게시판' })
});

module.exports = router;