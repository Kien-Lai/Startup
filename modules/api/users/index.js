const express = require('express');
const Router = express.Router();
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersModel = require('./usersModel');
const usersController = require('./usersController');
const examsController= require('../exams/examsController');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passportfb = require('passport-facebook').Strategy;

Router.use(Passport.initialize());
Router.use(Passport.session());

Passport.use(new passportfb(
  {
    clientID: "1923123451292803",
    clientSecret: "1266e1317650be9c89368b880dcddd03",
    callbackURL: "http://localhost:6969/api/users/aufb/cb",
    profileFields: ['email','gender','locale', 'displayName','photos']
  },
  (accessToken, refreshToken, profile, done) => {

    usersController.findUserByEmail(profile._json.email,(err,doc) => {
      if(err) return done(err)
      if(doc) return done(null,doc)
      else{
        var newUser = {
          username : profile._json.name,
          email : profile._json.email,
          avatar : profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg'
      }
      usersController.createUser(newUser,(er,doc) => {
        if(er) console.log(er);
        else {
          console.log('create success');
          return done(null,doc);
        }
      })
      }
    })
  }
))

Passport.use(new LocalStrategy(
  (username,password,done) => {
    usersController.getUserByUsername(username,(err,data) => {
      if(data){
        bcrypt.compare(password,data.password,(err,res) => {
          if(res){
            return done(null,data);
          }else{
            return done(null,false);
          }
        })
      }else{
        return done(null,false);
      }
    })
  }
))

//luu email vao ss
Passport.serializeUser((user, done) => {
  console.log('ok');
  done(null,user.email);
})

//so sanh email o session voi trong db
Passport.deserializeUser((user,done) => {
  usersController.findUserByEmail(user,(err,data) => {
    if(err){
      console.log(err);
      return(null,false);
    }else{
      if (data) {
        return done(null,data);
        console.log('h');
      }else {
        return done(null,false);
      }
    }
  })
})

Router.get('/auth/fb',Passport.authenticate('facebook', {scope: ['email']}));

Router.get('/aufb/cb', Passport.authenticate('facebook', {
  failureRedirect: '/',
  successRedirect: '/home/math',
  successFlash: 'Bạn đã đăng nhập thành công'
}))

Router.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
})

Router.route('/login')
.post(Passport.authenticate('local', {failureRedirect: '/',
                                      successRedirect: '/home/math',
                                      failureFlash: 'Đăng nhập không thành công',
                                      successFlash: 'Bạn đã đăng nhập thành công'}));

 // test da login hay chua
Router.get('/private', (req,res) => {
  if(req.isAuthenticated()){
    res.send('bạn đã login');
    console.log(req.user);
  }else{
    res.send('bạn chưa login');
  }
})
  //tao tai khoan
Router.post('/signup', (req, res) => {
  var newUser = {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    avatar : req.body.avatar
  }
  usersController.createUser(newUser, (err, doc) => {
    if (err) {
      console.log(err);
      res.redirect('/?message=' + err);
    } else {
      var sc = "Bạn đã tạo tài khoản thành công,mời bạn đăng nhập lại";
      res.redirect('/?SuccessSignup=' + sc );
    }
  })
});

// logout
Router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

Router.get('/search', (req, res) => {
  usersController.searchUserByUsernameAndEmail(req.query.searchString, (err, doc) => {
    if (err) {
      console.log(err);
      res.send('co loi');
    }else{
      res.send(doc);
    }
  })
})


module.exports = Router;
