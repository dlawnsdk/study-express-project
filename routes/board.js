var express = require('express');
var router = express.Router();
const connection = require('../lib/dataBase')
const redis = require('redis')
const client = redis.createClient(6379, "localhost");

// app.get으로 요청하는 경우 URL 적시 <-> app.use인 경우 / 만 적시
router.get('/board', function(req, res, next) {
    var searchText = req.param('searchText')
    console.log("검색값", searchText)
    client.hget("REDIS", "list", function(err, data) {
        // REDIS에 담겨있는 데이터 JSON 타입으로 변환
        obj = JSON.parse(data);
        // REDIS 데이터가 없는 경우 리스트 조회
        // 검색 텍스트가 있는 경우 리스트 조회
        if(obj === null && searchText === undefined){
            connection.query(
                "SELECT IDX, TITLE, CONTENTS FROM BOARD"
            ).then((result) => {
                // REDIS 세팅
                client.hset('REDIS', "list", JSON.stringify(result[0]) );
                res.render('board/list', { list: result[0] })
            })
        }
        else if(searchText !== undefined && searchText !== ""){
            connection.query(
                "SELECT IDX, TITLE FROM BOARD WHERE TITLE LIKE ?", '%' + searchText + '%'
            ).then((result) => {
                res.render('board/list', { list: result[0] })
            })
        }
        else{
            console.log("=========== REDIS 실행 =============")
            res.render('board/list', { list: obj })
        }
    })
});

router.get('/board/view', function(req, res, next) {
    const idx = req.param('idx')
    console.log("조회 게시물 번호", idx)
    connection.query(
        "SELECT IDX, TITLE, CONTENTS FROM BOARD WHERE IDX = ?", idx
    ).then((result) => {
        console.log(result[0][0])
        res.render('board/view', { view: result[0][0] })
    })
})

router.get('/board/edit', function(req, res, next) {
    res.render('board/edit')
});

router.post('/board/save', function(req, res, next) {
    var board = {
        title: req.body.title,
        contents: req.body.contents
    }
    connection.query(
        //"INSERT INTO BOARD(IDX, TITLE, CONTENTS) VALUES ( ?, ?, ?)", [3, req.body.title, req.body.contents]
        "INSERT INTO BOARD SET ?", board
    ).then((result) => {
        // 새로운 데이터가 생기는 경우 기존의 REDIS 데이터 삭제
        client.hdel("REDIS","list");
        res.redirect('/board')
    })
});

module.exports = router;