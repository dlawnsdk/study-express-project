var express = require('express');
var router = express.Router();

router.get('/chat', function(req, res, next) {
    console.log(req.session.account)
    if(req.session.account === undefined){
        res.send("<script>alert('로그인 해주세요'); location.href='/'</script>")
    }else{
        res.render('chat/chat', { session: req.session.account })
    }
})

module.exports = router;