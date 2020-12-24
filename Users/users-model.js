// create folder that you are creating functions for first 

const db = require('../db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
};


function find() {
    // must stringify how to find the data
    return db('users').select('id', "username", "password");
}

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id);
    });
}

function findById(id) {
    return db('users')
    .where({ id })
    .first();
}