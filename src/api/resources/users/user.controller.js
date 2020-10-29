const router = require('express').Router();
const userService = require('./user.service');




router.get('/', userService.getAllUsers)
 


 module.exports = router;