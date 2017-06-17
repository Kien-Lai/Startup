const express = require('express');
const Router = express.Router();
var passport= require('passport');
var session= require('express-session');


Router.use(passport.initialize());
Router.use(passport.session());


var confirmLogin= (req,res,next)=>{
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/');
  }
}

var isGuest=(req,res,next)=>{
  if(!req.isAuthenticated()){
    next();
  }else{
    res.redirect('/home');
  }
}

module.exports={
  confirmLogin,
  isGuest
}
