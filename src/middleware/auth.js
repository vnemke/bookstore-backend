const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    var token = jwt.sign({ email: user.email, firstName: user.firstName }, 'test123', { expiresIn: '3 days' });
    return token
}

const jwtCheck = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'test123')
        next()
    } catch {
        res.status(401).send()
    }
}

module.exports = { generateToken, jwtCheck }