const news = require('./newsModel');

var getAllNews =(cb) => {
  news.find({}).exec((err,doc) => {
    if(err) return cb(err);
    else return cb(null,doc);
  })
}

var upNews = (data,cb) => {
  news.create(data,(err,doc) => {
    if(err) {
      console.log(err);
      return cb(err);
    }else{
      return cb(null,doc);
    }
  })
}

var getPostByName= (title, cb)=>{
  news.findOne({title:title}, (err,doc)=>{
    if(err){
      cb(err);
    }else{
      cb(null,doc);
    }
  })
}

module.exports = {
  getAllNews,
  upNews,
  getPostByName
}
