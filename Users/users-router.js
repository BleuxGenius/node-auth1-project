const express = require('express');

const USERS = require('./users-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    USERS.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

module.exports = router;