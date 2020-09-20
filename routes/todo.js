'use strict';

const express = require('express');
const route = express.Router();
const userModel = require('../lib/models/user/users-model');
const basicAuth = require ('../middleware/basic');
// const OAuthMiddleware = require('./middleware/oauth');



route.post('./signup', signUp);
route.post('./signin',basicAuth,signIn);
route.get('/users', allUsers);
// route.get('/oauth',OAuthMiddleware,signInGitHub);



// for signUp

function signUp(req,res,next){
    let newUser= req.body;
    userModel.save(newUser)
    .then(result =>{
        let token = userModel.generateToken(result);
        res.cookie('token', token ,{
            expires : new Date(Date.now() + 9999999),
            httpOnly: false,
        });
        res.status(200).send({token:token});
    })
    .catch(()=>{
        res.json({error:'This userName is taken'});
    })
}


// for signIn

function signIn(req,res,next){
    res.cookie('token',req.token,{
        expires: new Date(Date.now() + 9999999),
        httpOnly : false,
    })
}

//  get all users
function allUsers(req,res,next){
    userModel.allUsers()
    .then(result =>{
        res.json(result);
    });
}


	// for oauth route
// function signInGitHub(req,res){
//   res.cookie('token', req.token, {
//     expires  : new Date(Date.now() + 9999999),
//     httpOnly : false,
//   });
//   res.status(200).send({  token: req.token });
// }


module.exports = routes;