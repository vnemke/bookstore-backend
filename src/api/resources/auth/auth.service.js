const bcrypt = require('bcryptjs');
const { User } = require('../../../../models');
const jwtAuth = require('../../../middleware/auth')


const register = async (req, res) =>{

     try {
          await User.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password
          })
          // res.redirect('/login')
     } catch(error) {
         
          // res.redirect('/register')
     }

}

const login = async (req, res)=>{
     try {
          const user = await User.findByCredentials(req.body.email, req.body.password)
          const token = jwtAuth.generateToken(user)
          res.json(token)
          // res.redirect('/')
          
     } catch(error) {
          res.status(404).send()
     }    
}


const logout = async (req, res)=>{
     res.redirect('/login');
}


module.exports = {
     register,
     login,
     logout
}

