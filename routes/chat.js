var express = require('express');
var router = express.Router();
var socketio = require('../lib/middleware/socket.io')

router.get('/chat', function(req, res, next) {
    socketio.test()
    res.render('chat/chat')
})

module.exports = router;