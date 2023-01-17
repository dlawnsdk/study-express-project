const crypto = require('crypto')

// 오브젝트 타입 로그 출력
exports.objtLog = (obj, str) => {
    console.log(str, JSON.stringify(obj));
}

// 암호화 솔트
exports.createSalt = () => {
    return crypto.randomBytes(64).toString('base64')
}

// 암호화
exports.createHashedPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
}