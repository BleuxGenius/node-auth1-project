const router = require('express').Router();
const bcrypt = require('bcrypt');
const restricted = require('');

const User = require('../Users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;

    if(!user.username || !user.password) {
        return res.status(500).json({ message: 'must provide username and password'});
    }

    if (user.password.length < 0) {
        return res.status(400).json({ message: 'please enter a password'})
    }

    const hash = bcrypt.hashSync(user.password, 16);

    user.password = hash;

    User.ass(user)
    .then(saved => {
        res.status(201).json(saved);

    })
    .catch(error => {
        res.status(500).json({ message: ' an error occured trying to register. Please try again.'})
    })
})

router.post('/login', (req, res) => {
    let {username, password } = req.body;

    User.findB({ username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password))
        {
            res.status(200).json({
                message: ` welcome ${user.username}`
            })
        } else {
            res.status(401).json({
                message: 'you shall not pass'
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router;