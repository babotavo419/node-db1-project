const express = require("express");

const server = express();

server.use(express.json());

server.use('*', (req ,res) => {
    req.statusCode(404).js({
        message: 'not found'
    })
})

module.exports = server;
