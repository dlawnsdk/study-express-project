var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('board', { title: '자유게시판' })
});

module.exports = router;