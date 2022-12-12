var express = require('express');
var router = express.Router();

// app.get으로 요청하는 경우 URL 적시 <-> app.use인 경우 / 만 적시
router.get('/board', function(req, res, next) {
    const url = req.url
    console.log("요청 URL " + url)
    if(url === "/board")  res.render('board/list', { title: '자유게시판' })
    else if(url === "/board/edit") res.render('board/edit')
});

module.exports = router;



