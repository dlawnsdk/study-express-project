const io = require('socket.io')

const socket = io();
exports.test = () => {
    socket.emit("chatting", "from front")
    console.log("채팅모듈")
}
