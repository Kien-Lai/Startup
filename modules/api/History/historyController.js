const historyModel = require('./historyModel')

var addHistory = (data,cb) => {
  historyModel.create(data,(err,doc) => {
    if(err){
      console.log(err);
      cb(err);
    }else{
      cb(null,doc);
    }
  })
}

var showHistory= (id,cb) =>{
  historyModel.find({userIdCreated: id})
  .exec((err,doc) => {
    if(err){
      console.log(err);
      return cb(err);
    }else{
      console.log('shown');
      return cb(null,doc);
    }
  })
}

var getHistoryByExamId= (idExam,idUser,cb) => {
  historyModel.findOne({idExam: idExam,userIdCreated: idUser})
  .exec((err,doc) => {
    if(err){
      console.log(err);
      return cb(err);
    }else{
      return cb(null,doc);
    }
  })
}

var getPointEasy= (data,cb) => {
  historyModel.find({subject:data.subject,level:'easy',userIdCreated: data.userId})
  .exec((err,doc) => {
    if(err){
     console.log(err);
       return cb(err);
    }else{
       // console.log(doc);
        return cb(null,doc);
      }
    })
}

var getPointMedium= (data,cb) => {
  historyModel.find({subject:data.subject,level:'medium',userIdCreated: data.userId})
  .exec((err,doc) => {
    if(err){
     console.log(err);
       return cb(err);
    }else{
       // console.log(doc);
        return cb(null,doc);
      }
    })
}

var getPointDifficult= (data,cb) => {
  historyModel.find({subject:data.subject,level:'difficult',userIdCreated: data.userId})
  .exec((err,doc) => {
    if(err){
     console.log(err);
       return cb(err);
    }else{
       // console.log(doc);
        return cb(null,doc);
      }
    })
}

var getPointAll= (data,cb) => {
  historyModel.find({subject:data.subject,userIdCreated: data.userId})
  .exec((err,doc) => {
    if(err){
     console.log(err);
       return cb(err);
    }else{
       // console.log(doc);
        return cb(null,doc);
      }
    })
}

var checkFirst = (data,userId,cb) => {
  var lastData = [];
  var array = [];
  array = data;
  array.forEach((exam) => {
    getHistoryByExamId(exam.id,userId,(err,doc) => {
      if(err){
        return cb(err);
      }
      else{
        if(doc == null) {
          lastData.push({
            level: exam.level,
            name: exam.name,
            firstTime: true
          })
        }else{
          lastData.push({
            level: exam.level,
            name: exam.name,
            firstTime: false
          })
        }
        return cb(null,lastData);
      }
    })
  })
}
module.exports = {
  addHistory,
  showHistory,
  getHistoryByExamId,
  getPointEasy,
  getPointMedium,
  getPointDifficult,
  getPointAll,
  checkFirst
}
