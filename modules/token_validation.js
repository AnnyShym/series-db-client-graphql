const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const config = require('./config');

const UNAUTHORIZED_MSG = 'Please, sign in as administrator first!';

function validateUser({req, res}) {

    const token = req.cookies.auth;

    jwt.verify(token, config.KEY, function(err, decoded) {
        if (err) {
            throw new AuthenticationError(UNAUTHORIZED_MSG);
        }
    });

}

module.exports = {
    validateUser
};
