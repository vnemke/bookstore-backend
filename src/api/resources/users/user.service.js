const { User } = require('../../../../models');


const getAllUsers = async (req, res)=>{

     try {
          const users = await User.findAll(
               { 
                    attributes: ['id','firstName','lastName','email']
               });

          res.send(users);

     } catch (error) {
          
     }
}



module.exports = {
     getAllUsers
}