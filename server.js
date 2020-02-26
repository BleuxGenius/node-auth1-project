// second file to set up 

const express = require('express');

const userRouter = require('./Users/users-router.js');
const authrouter = require('./auth/auth-router.js');

const server = express();

server.use(express.json()); // parse the JSON

server.use('/api/users', userRouter);
server.use('/api/auth', authrouter);

server.get('/', (req, res)=> {
    res.send('server is working!');
});

module.exports = server;