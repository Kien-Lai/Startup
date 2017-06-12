const express= require('express');
const config= require('./config.json');
const mongoose= require('mongoose');
const examsRouter= require(__dirname+ '/modules/api/exams/');
const bodyParser= require('body-parser');
const exphbs = require("express-handlebars");
const path = require('path');

var app = express();

// Setup Handlebars engine
app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
  extname: '.hbs'
}))
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.json({extend: true}));
app.use(bodyParser.urlencoded({extend: true}));
app.use('/exams', examsRouter);

app.use('/', function (req,res) {
  res.render('home');
})
mongoose.connect(config.connectionString, (err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('connect DB success !');
  }
})

app.listen(config.port, (req, res) => {
  console.log(`app listen on ${config.port}`);
})
