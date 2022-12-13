var express = require('express');
var router = express.Router();
const db = require('../models/boardDao/boardList')

// app.get으로 요청하는 경우 URL 적시 <-> app.use인 경우 / 만 적시
router.get('/board', function(req, res, next) {
    db.
    res.render('board/list', { title: '자유게시판' })
});

router.get('/board/edit', function(req, res, next) {
    res.render('board/edit')
});

router.post('/board/save', function(req, res, next) {
    console.log("test")
    console.log(req.body.title)
    console.log(req.body.contents)
    res.render('board/list', { title: '자유게시판' })
});

module.exports = router;



