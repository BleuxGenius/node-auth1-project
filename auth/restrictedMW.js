const bcrypt = require('bcryptjs');
const UserData = require('../Users/users-model.js');

module.exports = function restricted(req, res, next) {
    const { username, password} = req.headers;

    if (username && password) {
        UserData.findBy({ username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({ message: 'you shall not pass'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
    } else {
        res.status(400).json({ message: 'need credentials'})
    }
}