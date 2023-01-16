const redis = require('redis')
const client = redis.createClient(6379, "localhost");
const con = require('../lib/dataBase')

exports.boardList = (req, res, next) => {
    var searchText = req.param('searchText')
    client.hget("REDIS", "list", function(err, data) {
        // REDIS에 담겨있는 데이터 JSON 타입으로 변환
        const list = JSON.parse(data);
        // REDIS 데이터가 없는 경우 리스트 조회
        // 검색 텍스트가 있는 경우 리스트 조회
        if(list === null && searchText === undefined){
            con.query(
                "SELECT IDX, TITLE, CONTENTS FROM BOARD WHERE USEABLE = 'Y'"
            ).then((result) => {
                // REDIS 세팅
                client.hset('REDIS', "list", JSON.stringify(result[0]));
                res.render('board/list', { list: result[0], session: req.session.account })
            })
        }
        else if(searchText !== undefined && searchText !== ""){
            con.query(
                "SELECT IDX, TITLE FROM BOARD WHERE USEABLE = 'Y' AND TITLE LIKE ?", '%' + searchText + '%'
            ).then((result) => {
                res.render('board/list', { list: result[0], session: req.session.account })
            })
        }
        else{
            console.log("=========== REDIS 실행 =============")
            res.render('board/list', { list: list, session: req.session.account })
        }
    })
}

exports.boardView = (req, res, next) => {
    const idx = req.param('idx')
    con.query(
        "SELECT IDX, TITLE, CONTENTS, DATE, UPLOADER FROM BOARD WHERE IDX = ?", idx
    ).then((result) => {
        console.log(result[0][0])
        res.render('board/view', { view: result[0][0], session: req.session.account })
    })
}

exports.boardModify = (req, res, next) => {
    const idx = req.param('idx')
    con.query(
        "SELECT IDX, TITLE, CONTENTS, DATE, UPLOADER FROM BOARD WHERE IDX = ?", idx
    ).then((result) => {
        console.log(result[0][0])
        res.render('board/edit', { session: req.session.account, idx: req.param('idx'), modify: result[0][0] })
    })
}

exports.boardModifySave = (req, res, next) => {
    const idx = req.param('idx')
    let now = new Date();
    var board = {
        title: req.body.title,
        contents: req.body.contents,
        date: now,
        uploader: req.session.account.id,
        USEABLE: 'Y',
    }
    con.query(
        `UPDATE BOARD SET ? WHERE IDX = ${idx}`, board,
    ).then((result) => {
        client.hdel("REDIS","list");
        res.redirect('/board/view?idx=' + req.param('idx'))
    })
}

exports.boardSave = (req, res, next) => {
    let now = new Date();
    var board = {
        title: req.body.title,
        contents: req.body.contents,
        date: now,
        uploader: req.session.account.id,
        USEABLE: 'Y'
    }
    con.query(
        //"INSERT INTO BOARD(IDX, TITLE, CONTENTS) VALUES ( ?, ?, ?)", [3, req.body.title, req.body.contents]
        "INSERT INTO BOARD SET ?", board
    ).then((result) => {
        // 새로운 데이터가 생기는 경우 기존의 REDIS 데이터 삭제
        client.hdel("REDIS","list");
        res.redirect('/board?session=' + req.session.account)
    })
}

exports.boardRemove = (req, res, next) => {
    var idx = req.param('idx')

    con.query(
        'UPDATE BOARD SET USEABLE = "N" WHERE IDX = ?', idx
    ).then((result) => {
        client.hdel("REDIS","list");
        res.send("<script>alert('삭제 되었습니다.'); location.href = '/board'</script>")
    })
}
