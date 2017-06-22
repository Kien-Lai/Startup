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
const flash = require('connect-flash');
const historyModel = require('./modules/api/History/historyModel.js');
const historyController = require('./modules/api/History/historyController.js');

app.use(session({
  secret: "khang",
  cookie: {
    maxAge : 1000*60*5*1000 //khoang thoi gian luu cookie
    }
  }))

app.use(Passport.initialize());
app.use(Passport.session());
app.use(express.static(__dirname + '/public'));
app.use(flash());

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
  var getMs = req.query.message;
  var SuccessSignup = req.query.SuccessSignup;
  res.render('index',{LoginMessage: req.flash().error,SignupMessage:getMs,SuccessSignup:SuccessSignup});
});

app.get('/home/math',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfMath((err, data)=>{
    if(err){
      res.send(err);
    }else{
      usersController.rankingUser((err,doc) =>{
        if(err) res.send(err);
        else{
          res.render('home',{user: req.user, exams: data, subject: 'math',message:req.flash().success,top10:doc});
        }
      })
    }
  })
});

app.get('/home/phy',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfPhy((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'phy'});
    }
  })
});

app.get('/home/chem',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfChem((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'chem'});
    }
  })
});

app.get('/home/bio',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfBio((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'bio'});
    }
  })
});

app.get('/home/eng',middleware.confirmLogin,(req,res) => {
  examsController.getAllExamsOfEng((err, data)=>{
    if(err){
      res.send(err);
    }else{
      console.log(data);
      res.render('home',{user: req.user, exams: data, subject: 'eng'});
    }
  })
});

app.get('/exam',middleware.confirmLogin, (req,res)=>{
  res.render('exam',{nameOfExam:req.query.nameOfExam});
});

app.get('/result',(req,res)=>{
  res.render('result');
})

app.post('/result',middleware.confirmLogin, (req,res)=>{
  const oldrank = req.user.rank; //rank cu cua user
  var answers = [];
  answers.push(req.body.q1);
  answers.push(req.body.q2);
  answers.push(req.body.q3);
  answers.push(req.body.q4);
  answers.push(req.body.q5);
  answers.push(req.body.q6);
  answers.push(req.body.q7);
  answers.push(req.body.q8);
  answers.push(req.body.q9);
  answers.push(req.body.q10);
  answers.push(req.body.q11);
  answers.push(req.body.q12);
  answers.push(req.body.q13);
  answers.push(req.body.q14);
  answers.push(req.body.q15);
  answers.push(req.body.q16);
  answers.push(req.body.q17);
  answers.push(req.body.q18);
  answers.push(req.body.q19);
  answers.push(req.body.q20);
  answers.push(req.body.q21);
  answers.push(req.body.q22);
  answers.push(req.body.q23);
  answers.push(req.body.q24);
  answers.push(req.body.q25);
  answers.push(req.body.q26);
  answers.push(req.body.q27);
  answers.push(req.body.q28);
  answers.push(req.body.q29);
  answers.push(req.body.q30);
  answers.push(req.body.q31);
  answers.push(req.body.q32);
  answers.push(req.body.q33);
  answers.push(req.body.q34);
  answers.push(req.body.q35);
  answers.push(req.body.q36);
  answers.push(req.body.q37);
  answers.push(req.body.q38);
  answers.push(req.body.q39);
  answers.push(req.body.q40);
  answers.push(req.body.q41);
  answers.push(req.body.q42);
  answers.push(req.body.q43);
  answers.push(req.body.q44);
  answers.push(req.body.q45);
  answers.push(req.body.q46);
  answers.push(req.body.q47);
  answers.push(req.body.q48);
  answers.push(req.body.q49);
  answers.push(req.body.q50);
  //so sanh dap an
  examsController.compareAnswer(answers,req.body.nameOfExam,(err,doc) => {
    if(err){
      console.log(err);
    }else{
      console.log(req.body.nameOfExam);
      var factor;

      //lay du lieu exam bang name gui tu body
      examsController.getExamByName(req.body.nameOfExam,(err,exam) => {
        if(err){
          res.send('Something error');
        }else{
          if(exam.level == 'easy'){ //hệ số mức điểm cho đề thi
            factor = 1;
          }if(exam.level == 'medium'){
            factor = 1.5;
          }else{
            factor = 2;
          }

          //tim xem trong history co exam day hay chua
          historyController.getHistoryByExamId(exam.id,req.user.id,(err,history) => {
            if(err){
              console.log(err);
            }else{
              if(history == null){
                console.log('da chay vao day');
                var newPoint = Math.round((factor*doc.numberOfTrueAnswer*0.2 + req.user.point)*1000)/1000; //new point
                //update poit cho user
                usersController.updatePoint(req.user.username,newPoint,(err,done) => {
                  if(err) res.send('đã xảy ra lỗi');
                  else {
                    console.log('updated point');
                    usersController.rankingUser((er,ok) => {
                      if(er) console.log(er);
                      else {
                        var data = {
                          answersUser : answers, // đáp án người dùng nhập
                          numberOfTrueAnswer : doc.numberOfTrueAnswer, //số đáp án đúng
                          arrayAnswer : doc.arrayAnswer, //mảng gồm những câu đúng và sai
                          nowPoint: req.user.point, // poit hiện tại của user
                          score:  Math.round(doc.numberOfTrueAnswer*0.2*1000)/1000, //điểm bài thi
                          oldrank : oldrank,
                          bonusPoint: Math.round(doc.numberOfTrueAnswer*0.2*1000*factor)/1000,
                          newRank: req.user.rank,
                          newPoint: Math.round( req.user.point*1000 + doc.numberOfTrueAnswer*0.2*1000*factor)/1000,
                          trueAnswer: exam.answers,
                          examName : exam.name
                        };
                        var historyData = {
                          idExam : exam.id,
                          numberOfTrueAnswer : doc.numberOfTrueAnswer,
                          userIdCreated: req.user.id,
                          rankUpdated: req.user.rank,
                          bonusPoint: data.bonusPoint,
                          level: exam.level,
                          subject: exam.subject,
                          score: Math.round(doc.numberOfTrueAnswer*0.2*1000)/1000,
                          name: exam.name
                        };
                        historyController.addHistory(historyData,(err,done)=>{
                          if(err) console.log(err);
                          else console.log('done');
                        })
                         res.render('result',{answersUser: data.answersUser,numberOfTrueAnswer: data.numberOfTrueAnswer,arrayAnswer: data.arrayAnswer,
                           nowPoint: data.nowPoint,score: data.score,bonusPoint: data.bonusPoint,newPoint: data.newPoint,trueAnswer: data.trueAnswer,
                           examName : data.examName,rank : data.newRank
                         });

                      }
                    })
                  }
                })
                //update rank

              }else{
                console.log('da chay vao history');
                var coreData = {
                  answersUser : answers, // đáp án người dùng nhập
                  numberOfTrueAnswer : doc.numberOfTrueAnswer, //số đáp án đúng
                  arrayAnswer : doc.arrayAnswer, //mảng gồm những câu đúng và sai
                  nowPoint: req.user.point, // poit hiện tại của user
                  score:  Math.round(doc.numberOfTrueAnswer*0.2*1000)/1000, //điểm bài thi
                  trueAnswer: exam.answers,
                  examName : exam.name,
                  rank : req.user.rank,
                  bonusPoint : 0
                }
                var coreHistory = {
                  idExam : exam.id,
                  numberOfTrueAnswer : doc.numberOfTrueAnswer,
                  userIdCreated: req.user.id,
                  level: exam.level,
                  subject: exam.subject,
                  score: Math.round(doc.numberOfTrueAnswer*0.2*1000)/1000,
                  name: exam.name
                }
                historyController.addHistory(coreHistory,(err,done)=>{
                  if(err) console.log(err);
                  else {
                    res.render('result',{answersUser: coreData.answersUser,numberOfTrueAnswer: coreData.numberOfTrueAnswer,arrayAnswer: coreData.arrayAnswer,
                    nowPoint: coreData.nowPoint,score: coreData.score,trueAnswer: coreData.trueAnswer,examName: coreData.examName,rank: coreData.rank,
                  bonusPoint: coreData.bonusPoint});
                  }
                })
              }
          }
        })
        }
      })
    }
  })
})

app.get('/history',middleware.confirmLogin,(req,res) => {
  historyController.showHistory(req.user.id,(err,doc) => {
    if(err) res.send('ERROR');
    else res.send(doc);
  })
})

app.get('/news',(req,res)=>{
  res.render('news');
})

app.get('/progess',middleware.confirmLogin,(req,res)=>{
  var data = {
   subject : 'math',
   level : 'easy',
   userId : req.user.id
  }
 historyController.getPoint(data,(err,doc) => {
    if(err) res.send('đã xảy ra lỗi');
    else{
     var point = doc.map((value) => {
      return value.score;
      })
      var name = doc.map((value) => {
      return value.name;
      })
      console.log(point);
      res.render('progess',{point: point,name: name});
    }
  })

})

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
