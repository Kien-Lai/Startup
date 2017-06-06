  const express= require('express');
  const Router= express.Router();
  const examsController= require('./examsController');

  Router.post('/add',(req,res)=>{
    var object= {};
    object.school= req.body.school;
    object.subject= req.body.subject;
    object.numberOfQuestions= req.body.numberOfQuestions;
    object.answers = req.body.answers;
    object.examspath = req.body.examspath;
    object.level = req.body.level;
    object.year = req.body.year;
    examsController.saveExam(object, (err, data)=>{
      if(err){
        console.log(err);
        res.send('error');
      }else{
        console.log(data);
        res.send('success');
      }
    })
  })

  Router.get('/',(req,res) =>{
    if(req.query.school){
      examsController.searchExamsBySchool(req.query.school,(err,doc) =>{
        if(err){
          res.send('err');
        }else {
          res.send(doc);
          console.log('sent');
        }
      })
    }else if (req.query.year) {
      examsController.searchExamsByYear(req.query.year,(err,doc) =>{
        if(err){
          res.send('err');
        }else {
          res.send(doc);
          console.log('sent');
        }
      })
    }else if (req.query.level) {
      examsController.searchExamsByLevel(req.query.level,(err,doc) =>{
        if(err){
          res.send('err');
        }else {
          res.send(doc);
          console.log('sent');
        }
      })
    } else{
    examsController.getAllExams((err,doc) =>{
      if(err){
        console.log(err);
        res.send('error');
      }else{
        console.log('sent');
        res.send(doc);
      }
    }
    )}
  })

  Router.put('/', (req,res) => {
    var object= {};
    object.school= req.body.school;
    object.subject= req.body.subject;
    object.numberOfQuestions= req.body.numberOfQuestions;
    object.answers = req.body.answers;
    object.examspath = req.body.examspath;
    object.level = req.body.level;
    object.year = req.body.year;
    var id=req.body.id;
    examsController.updateExamsById(id,object,(err,doc) => {
      if(err){
        res.send(err);
      }else {
        res.send('updated');
      }
    })
  })

  Router.delete('/', (req,res) => {
    examsController.deleteExamsById(req.body.id,(err,doc) => {
      if(err){
        res.send(err);
      }else{
        res.send('deleted');
      }
    })
  })

  module.exports= Router;
