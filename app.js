const express = require('express');
const config = require('./config.json');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Passport = require('passport');
const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')({
  handlebars: handlebars
});
const examsRouter = require(__dirname + '/modules/api/exams/');
const usersRouter = require(__dirname + '/modules/api/users/');
const usersController = require('./modules/api/users/usersController');
const examsController = require('./modules/api/exams/examsController');
const middleware= require('./modules/api/middleware/middleware.js');
const app = express();

app.use(session({
  secret: "khang",
  cookie: {
    maxAge : 1000*60*5*1000 //khoang thoi gian luu cookie
  }
  }))

app.use(Passport.initialize());
app.use(Passport.session());
app.use(express.static(__dirname + '/public'));

// Set up handlebars engine
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(bodyParser.json({ extend: true }));
app.use(bodyParser.urlencoded({ extend: true }));
app.use('/api/exams', examsRouter);
app.use('/api/users', usersRouter);

app.get('/',middleware.isGuest, (req, res) => {
  res.render('index');
});


app.get('/home/math',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfMath((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'math'});
    }
  })
});

app.get('/home/phy',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfPhy((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'math'});
    }
  })
});

app.get('/home/chem',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfChem((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'math'});
    }
  })
});

app.get('/home/bio',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfBio((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'math'});
    }
  })
});

app.get('/home/Eng',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfEng((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'math'});
    }
  })
});

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect DB success !');
  }
})

app.listen(config.port, (req, res) => {
  console.log(`App listen on Port : ${config.port}`);
})
