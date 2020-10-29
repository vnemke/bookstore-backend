const router = require('express').Router();
const authService = require('./auth.service');


router.post('/register', authService.register)
 
router.post('/login', authService.login)
 
router.post('/logout', authService.logout);

module.exports = router;