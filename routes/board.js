
const dao = require('../Dao/boardDao')
var express = require('express');
var router = express.Router();


// 리스트
router.get('/board', function(req, res, next) {
    dao.boardList(req, res, next)
});

// 뷰
router.get('/board/view', function(req, res, next) {
    dao.boardView(req, res, next)
})

// 글 등록 페이지
router.get('/board/edit', function(req, res, next) {
    console.log(req.session.account)
    if(req.session.account === undefined){
        res.send("<script>alert('로그인 해주세요'); location.href='/board'</script>")
    }else{
        res.render('board/edit', { session: req.session.account })
    }
});

// 글 수정 페이지
router.get('/board/modify', function(req, res, next) {
    console.log("test")
    if(req.session.account === undefined){
        res.send("<script>alert('로그인 해주세요'); location.href='/board'</script>")
    }else{
        dao.boardModify(req, res, next)
    }
});

// 글 수정 저장
router.post('/board/modifySave', function(req, res, next) {
        dao.boardModifySave(req, res, next)
});

// 글 저장
router.post('/board/save', function(req, res, next) {
    dao.boardSave(req, res, next)
});

// 글 삭제
router.get('/board/remove', function(req, res, next) {
    dao.boardRemove(req, res, next)
});

module.exports = router;