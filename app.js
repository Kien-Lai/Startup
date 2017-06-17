const express = require('express');
const config = require('./config.json');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Passport = require('passport');
const hbs = require('express-handlebars');
const path = require('path');
const examsRouter = require(__dirname+ '/modules/api/exams/');
const usersRouter = require(__dirname+ '/modules/api/users/');

const app= express();

app.use(express.static(__dirname + '/public'));
// Set up handlebars engine
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + 'views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.set('users','./users');
app.use(bodyParser.json({extend: true}));
app.use(bodyParser.urlencoded({extend: true}));
app.use('/exams', examsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) =>{
  res.render('home');
});


mongoose.connect(config.connectionString, (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('Connect DB success !');
  }
})

app.listen(config.port, (req, res) => {
  console.log(`App listen on ${config.port}`);
})
