const jwt = require('jsonwebtoken')
const config = require('../config')

function verifyToken(req, res, next) {
    // token in cookie
    token = req.headers.authorization.substring(7, req.headers.authorization.length);
    if (!token) {
        return res.status(403).send({
            auth: false, message: 'No token provided.'
        })
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            })
        }
        req.userId = decoded.id
        next()
    })
}

module.exports = verifyToken