const mongoose = require('mongoose');

const usersModel = require('./usersModel');


var findUserByEmail = (data,cb)=> {
  usersModel.findOne({email:data}, (err,doc) => {
    if(err) return cb(err);
    else return cb(null,doc);
  })
}

var rankingUser = (cb) => {
  usersModel.find({})
  .sort({point:-1})
  .exec((err,doc) => {
    if(err){
      console.log(err);
      return cb(err);
    }else{
      var topTen = [];
      var i=0;
      var j=1; //gán rank
      doc.forEach((user) => {
        updateById(j,user.id,(err,doc)=>{
          if(err) console.log(err);
          } );
        j++;
      })
      while (i<10) {
        topTen.push(doc[i]);
        i++;
      }
      return cb(null,topTen);
    }
  })
}

var onlyRanked =(cb) => {
  usersModel.find({})
  .sort({point:-1})
  .exec((err,doc) => {
    if(err){
      console.log(err);
      return cb(err);
    }else{
      var j=1;
      doc.forEach((user) => {
        updateById(j,user.id,(err,doc)=>{
          if(err) console.log(err);
        });
        j++;
      })
      return cb(null,doc);
    }
})
}

var updateById= (data,id,cb) => {
  usersModel.update(
    {id:id},
    {rank: data}
  ).exec((err,doc) => {
    if(err){
      console.log(err);
      cb(err)
    }else{
      cb(null,doc);
    }
  })
}

var createUser = (data, callback) => {
  usersModel.findOne({})
    .select('id')
    .sort({id : -1})
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        var id;
        if (doc && doc.id) {
          id = doc.id + 1;
        } else {
          id = 1;
        }
        data.id = id;
        usersModel.create(data, (err, doc) => {
          if (err) {
            console.log(err);
            console.log('message', err.message);
            console.log('error message', err.errmsg);
            callback(err);
          } else {
            callback(null,doc);
          }
        })
      }
    })
}

var getUserByUsername = (username, callback) => {
  try {
    usersModel.findOne({username : username}).exec((err,doc) => {
      if(err){
        console.log(err);
      }else{
        return callback(null,doc);
      }
    })
  } catch (e) {
    console.log(e);
    callback(e);
  }
}

var updatePoint = (username,newPoint,cb) => {
  usersModel.update({username},
  {point:newPoint})
  .exec((err,doc) => {
    if(err){
      console.log(err);
      return cb(err);
    }else{
      return cb(null,doc);
    }
  })
}

module.exports = {
  findUserByEmail,
  createUser,
  getUserByUsername,
  rankingUser,
  updateById,
  updatePoint,
  onlyRanked
}
