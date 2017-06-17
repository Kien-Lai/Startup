const express = require('express');
const config = require('./config.json');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Passport = require('passport');
const hbs = require('express-handlebars');
const path = require('path');
const examsRouter = require(__dirname + '/modules/api/exams/');
const usersRouter = require(__dirname + '/modules/api/users/');
const usersController = require('./modules/api/users/usersController');
const session = require('express-session');
const examsController = require('./modules/api/exams/examsController');

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

app.set('users', './users');
app.use(bodyParser.json({ extend: true }));
app.use(bodyParser.urlencoded({ extend: true }));
app.use('/exams', examsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  // console.log(req.Session.passport.user);
  res.render('index');
  console.log(req.user);
});

app.get('/home', (req,res) => {
  examsController.getAllExams((err, data)=>{
    if(err){
      res.send(err);
    }else{
      res.render('home',{user: req.user, exams: data});
    }
  })
})

app.get('/test', (req, res) => {
  res.render('home', {abc: "Hehehehe"});
});


mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect DB success !');
  }
})

app.listen(config.port, (req, res) => {
  console.log(`App listen on ${config.port}`);
})
