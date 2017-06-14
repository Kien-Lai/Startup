  const mongoose = require('mongoose');
  const bcrypt = require('bcrypt');
  const Schema = mongoose.Schema;

  var usersSchema = new Schema({
    id : {type : Number,require : true, unique: true},
    username : {type : String,require : true,unique:true},
    password : { type : String,require : true,minlength : 6},
    email :
    { type : String, required : true, unique : true, validate : {
      validator :
        (value) => {
          var regex = /@/;
          return regex.test(value);
        },
        message : '{VALUE} is not valid email',
    } },
    avatar : { type : String , default : ''},
    createdDate :  { type : Date, default : new Date().toISOString() },
    updatedDate :  { type : Date, default : new Date().toISOString() },
    // profile : { type : ObjectId, ref : 'profiles', default : null},
    rank: {type : Number,require : true},
    point: {type :Number}
  })

  usersSchema.pre('save', function (next) {
    var user = this;
    console.log("this is user",user);

    if (!user.isModified('password')) {
      return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  });


  module.exports = mongoose.model('users', usersSchema);
