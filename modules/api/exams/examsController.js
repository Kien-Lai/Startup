const examsModel= require('./examsModel');

var saveExam= (object, callback)=>{
  examsModel.findOne({})
  .select('id')
  .sort({id:-1})
  .exec((err,doc) => {
    if(err){
      console.log(err);
      callback(err);
    } else {
      var id;
      if (doc && doc.id) {
        id= doc.id + 1;
      }else {
        id=1;
      }
      object.id=id;
      examsModel.create(object, (err,doc) => {
        if (err) {
          console.log(err);
          console.log('message', err.message);
          callback(err);
        } else {
          callback(null,doc);
        }
      })
    }
  })
}

var getAllExams = (cb) => {
examsModel.find({},{name: 1,_id: 0})
.exec((err,doc) => {
  if(err){
    cb(err);
    console.log('err');
  }else{
    cb(null,doc)
    console.log('ok');
  }
})
}

var searchExamsBySchool = (searchString,cb) =>{
  try {
    examsModel.find({ $text: { $search: searchString } })
    .exec((err, doc) => {
      if (err) {
        cb(err);
        console.log(err);
      } else {
        cb(null, doc);
      }
    })
  } catch (e) {
    console.log(e);
    cb(e);
  }
}

var searchExamsByYear = (searchString,cb) =>{
  try {
    examsModel.find({'year': searchString})
    .exec((err, doc) => {
      if (err) {
        cb(err);
        console.log(err);
      } else {
        cb(null, doc);
      }
    })
  } catch (e) {
    console.log(e);
    cb(e);
  }
}

var searchExamsByLevel = (searchString,cb) =>{
  try {
    examsModel.find({'level': searchString})
    .exec((err, doc) => {
      if (err) {
        cb(err);
        console.log(err);
      } else {
        cb(null, doc);
      }
    })
  } catch (e) {
    console.log(e);
    cb(e);
  }
}

var updateExamsById = (id,data,cb) => {
  examsModel.count({'id':id},(err,count) => {
    if(count==0){
      console.log('khong tim thay id');
      return cb('khong thay id')
    }else {
      examsModel.update({'id':id},data,(err,doc) =>{
        if(err){
          console.log(err);
          cb(err);
        }else{
          console.log('ok');
          cb(null,err);
        }
      });
    }
  })
}

var deleteExamsById = (id,cb) => {
  examsModel.count({'id':id},(err,count) => {
    if(count==0){
      console.log('khong tim thay id');
      return cb('khong thay id')
    }else {
      examsModel.remove({'id':id},(err,doc) =>{
        if(err){
          console.log(err);
          cb(err);
        }else{
          console.log('ok');
          cb(null,err);
        }
      });
    }
  })
}

module.exports= {
  saveExam,
  getAllExams,
  searchExamsBySchool,
  searchExamsByYear,
  searchExamsByLevel,
  updateExamsById,
  deleteExamsById
}
