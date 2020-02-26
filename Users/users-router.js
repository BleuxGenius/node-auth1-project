const express = require('express');

const USERS = require('./users-model.js');
const restricted = require('../auth/restrictedMW.js');

const router = express.Router();

router.get('/', restricted, (req, res) => {
    USERS.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

module.exports = router;