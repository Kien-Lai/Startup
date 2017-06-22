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

var getPoint= (data,cb) => {
  historyModel.find({subject:data.subject,level:data.level,userIdCreated: data.userId})
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

module.exports = {
  addHistory,
  showHistory,
  getHistoryByExamId,
  getPoint
}
