/**
 * MySql 연동
 */
const mysql = require('mysql2/promise')
const connection = mysql.createPool({
    host : 'localhost',
    port : 3306,
    user : 'jalim',
    password : 'dla39275566!',
    database : 'nodeExpress',
    connectionLimit: 4
})
module.exports = connection