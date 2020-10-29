const bcrypt = require('bcryptjs');
'use strict';
module.exports = (sequelize, DataTypes) => {

  var User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },//End definition
  
  {

    hooks: {
        beforeCreate: async(user)=>{
            try {
                const hashedPassword = await user.hashPassword(user.password);
                user.password = hashedPassword;
            } catch (e) {
                
            }
        },
        beforeUpdate: async(user)=>{
            if(user.password){
                try {
                    user.password = await user.hashPassword(user.password);
                } catch (e) {
                    
                }
            }
        }
    }



  });//End hooks

  User.associate = function(models) {
    
  };

    User.findByCredentials = async (email, password) => {
        
        let normalizedEmail = email.trim().toLowerCase()

        const user = await User.findOne({
            where: { email: normalizedEmail }
        })

        if(!user) {
            throw new Error('Incorrect email/password')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        
        
        if(!isMatch) {
            throw new Error('Incorrect email/password')
        }
        
        return user
    }

    User.prototype.hashPassword = async function(password){
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }

    return User;
};