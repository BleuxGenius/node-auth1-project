// second file to set up 

const express = require('express');

const server = express();

server.use(express.json()); // parse the JSON

// server.use('', userRouter);

server.get('/', (req, res)=> {
    res.send('server is working!');
});

module.exports = server;