const mongoose = require('mongoose');

const usersModel = require('./usersModel');


var findUserByEmail = (data,cb)=> {
  usersModel.findOne({email:data}, (err,doc) => {
    if(err) return cb(err);
    else return cb(null,doc);
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

var searchUserByUsernameAndEmail = (searchString, callback) => {
  try {
    usersModel.find({ $text: { $search: searchString } }).exec((err, doc) => {
      if (err) {
        callback(err);
      } else {
        callback(null, doc);
      }
    })
  } catch (e) {
    console.log(e);
    callback(e);
  }
}


module.exports = {
  createUser,
  searchUserByUsernameAndEmail,
  getUserByUsername,
  findUserByEmail
}
