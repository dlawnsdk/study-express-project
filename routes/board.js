var express = require('express');
var router = express.Router();
const dao = require('../models/boardDao/boardList')
const connection = require('../lib/dataBase')

// app.get으로 요청하는 경우 URL 적시 <-> app.use인 경우 / 만 적시
router.get('/board', function(req, res) {
    res.render('board/list', { list: dao.list() })
});

router.get('/board/edit', function(req, res, next) {
    res.render('board/edit')
});

router.post('/board/save', function(req, res, next) {

    var board = {
        idx: 3,
        title: req.body.title,
        contents: req.body.contents
    }
    connection.query(
        //"INSERT INTO BOARD(IDX, TITLE, CONTENTS) VALUES ( ?, ?, ?)", [3, req.body.title, req.body.contents]
        "INSERT INTO BOARD SET ?", board
    ).then((result) => {
        res.render('/board')
    })
});

module.exports = router;



