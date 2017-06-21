const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const historySchema = new mongoose.Schema({
  idExam: {type: Number, require: true},
  numberOfTrueAnswer: {type: Number,require: true},
  userIdCreated: {type: Number, ref: 'users',default: null},
  rankUpdated : {type : Number},
  bonusPoint : {type: Number,dafault: 0}
})
module.exports = mongoose.model('history',historySchema);
