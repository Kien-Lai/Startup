const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const historySchema = new mongoose.Schema({
  idExam: {type: Number, required: true},
  numberOfTrueAnswer: {type: Number,required: true},
  userIdCreated: {type: Number, ref: 'users',default: null},
  rankUpdated : {type : Number,default: 0},
  bonusPoint : {type: Number,dafault: 0}
})
module.exports = mongoose.model('history',historySchema);
