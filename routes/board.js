
const dao = require('../Dao/boardDao')
var express = require('express');
var router = express.Router();


// 리스트
router.get('/board', function(req, res, next) {

    /*dao.boardList(this.req, this.res, this.next)*/
    dao.boardList(req, res, next)

});

// 뷰
router.get('/board/view', function(req, res, next) {
    dao.boardView(req, res, next)
})

// 글 등록
router.get('/board/edit', function(req, res, next) {
    dao.boardEdit(req, res, next)
});

// 글 저장
router.post('/board/save', function(req, res, next) {
    dao.boardSave(req, res, next)
    res.redirect('/board')
});

// 글 삭제
router.get('/board/remove', function(req, res, next) {
    dao.boardRemove(req, res, next)
});

module.exports = router;