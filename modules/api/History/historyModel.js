const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const historySchema = new mongoose.Schema({
  idExam: {type: Number, required: true, ref: 'exams'},
  numberOfTrueAnswer: {type: Number,required: true},
  userIdCreated: {type: Number, ref: 'users',default: null},
  rankUpdated : {type : Number,default: 0},
  bonusPoint : {type: Number,dafault: 0},
  subject : {type: String,required: true},
  level: {type : String,required: true},
  score: {type : Number,required:true},
  name:{type : String}

})
module.exports = mongoose.model('history',historySchema);
