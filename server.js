// second file to set up 

const express = require('express');
const session = ('express-session');

const config = require('./db-config.js')

const userRouter = require('./Users/users-router.js');
const authrouter = require('./auth/auth-router.js');

const server = express();

// const sessionConfig = {
//     name: 'monkey', // sid
//     secret: 'keep it a secret, keep it safe!',
//     cookie: {
//         maxAge: 1000 * 30, // in miliseconds 
//         secure: false, // can i send this over a secure connection , can be false . true in production
//         httpOnly: true // can not be accesed from javscript. set to true will not be availabale for the client 
//     },
//     resave: false,
//     saveUninititalized: false, // recreate a session if it has not changed , 
//     // for GDPR laws against setting cookies automatically 
// };

server.use(express.json()); // parse the JSON
// server.use(session(sessionConfig))

server.use('/api/users', userRouter);
server.use('/api/auth', authrouter);

server.get('/', (req, res)=> {
    res.json({ api: 'up' });
});

module.exports = server;