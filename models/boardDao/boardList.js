var express = require('express');
const connection = require('../../lib/dataBase')

exports.list = (req, res) => {
    connection.query(
        "SELECT IDX, TITLE, CONTENTS FROM BOARD"
    ).then((result) => {
        return result
    })
}




