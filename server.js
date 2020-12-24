const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session); // remember to curry & pass session
const authRouter = require('./auth/auth-router.js');
const apiRouter = require('./api/api-router.js');
const usersRouter = require('./Users/users-router.js');
const configureMiddleware = require('./api/configure-middleware.js');
const restricted = require('./auth/restricted-middleware.js');
const knex = require('./db-config.js'); // stores sessions in db
const server = express();


const sessionConfig = {
	name: 'monster',
	secret: 'keep it secret, keep it safe!',
	resave: false,
	saveUninitialized: true, // GDPR compliance
	cookie: {
		maxAge: 1000 * 60 * 10,
		secure: false, // should be true in production
		httpOnly: true // true = can't touch cookie
	},
	store: new KnexStore({
		knex,
		tablename: 'sessions',
		createtable: true,
		sidfieldname: 'sid',
		clearInterval: 1000 * 60 * 15
	})
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig)); // turn on session MW
server.use('/api/', authRouter);
server.use('/api/users', restricted, usersRouter);


server.get('/', (req, res) => {
	// console.log(req.session);
	res.json({ api: 'up' });
});
module.exports = server;