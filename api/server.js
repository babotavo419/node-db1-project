const express = require("express");

const accountsRouter = require("./accounts/accounts-router");

const server = express();

server.use("/api/accounts", accountsRouter);

server.use(express.json());

server.use('*', (req ,res) => {
    req.statusCode(404).js({
        message: 'not found'
    })
})

module.exports = server;
