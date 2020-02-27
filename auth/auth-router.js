const router = require('express').Router();
const bcrypt = require('bcrypt');
const restricted = require('./restricted-middleware.js');

const User = require('../Users/users-model.js');

// starting point 
router.post('/register', (req, res) => {
    let user = req.body;
    
    const hash = bcrypt.hashSync(user.password, 16);
    user.password = hash;

    User.add(user)
    .then(saved => {
        console.log(saved)
        req.session.loggedIn = true;
        res.status(201).json(saved);

    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})

router.post('/login',  (req, res) => {
    let {username, password } = req.body;

    User.findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user; // svaing the information about the user from the session. 
            // now that we have it saved 
            // a cookie will be created and sent back to the client. 
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