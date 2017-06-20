const historyModel = require('/historyModel')

var addHistory = (data,cb) => {
  HistoryModel.create(data,(err,doc) => {
    if(err){
      console.log(err);
      cb(err);
    }else{
      cb(null,doc);
    }
  })
}

module.exports = {
  addHistory
}
