const express = require('express');

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

const router = express.Router();

// we would like this to be protected 
router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

module.exports = router;