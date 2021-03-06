'use strict';
require('dotenv').config();
const users = require('./users-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET =  process.env.SECRET || 'homesweet';

class UsersModel{
  async authenticate(username, password){
    return new Promise((resolve,reject) =>{
      return users.find({username:username})
        .then(result =>{
          if(result.length){
            bcrypt.compare(password, result[0].password)
              .then(final =>{
                if(final){
                  return  resolve(users.find({username:username}));
                }
                else{
                  return reject('error');
                }
              });
          }
          else{
            return reject('error');
          }
        });   
    });
   
  }

  generateToken(user){
    let roles = {
      user:['read'],
      admin: ['read','delete','update','create'],
      editor:['read','create','update'],
      writer: ['read','create'],
    };
    let token = jwt.sign({username: user.username, capability:roles[user.role]},SECRET,{
      expiresIn: '15m',
    });
    return token;
  }
  async save(newUser){
    return users.find({username: newUser.username})
      .then(async result=>{
        if(!result[0]){
          newUser.password = await bcrypt.hash(newUser.password,5);
          let newUserSave = new users(newUser);
          let final = await newUserSave.save();
          return final;
        }
          return Promise.reject();
        
      });
    
  }
  allUsers(){
    return users.find({});
  }

  verfiyToken(token){
    return jwt.verify(token, SECRET, (err, verifiedJwt) => {
      if(err){
        return Promise.reject();
      }else{
        let username = verifiedJwt['username'];
        return users.find({username})
          .then(result =>{
            if(result.length){
              return Promise.resolve(verifiedJwt);
            }
            else{
              return Promise.reject();
            }
          });
      }
    });
  }
  can(permision){
    if(permision){
      return Promise.resolve(true);
    }
    else{
      return Promise.resolve(false);
    }
  }
}

module.exports = new UsersModel();