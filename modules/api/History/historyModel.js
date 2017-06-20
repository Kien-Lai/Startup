const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Type.ObjectId;

const examsSchema = new mongoose.Schema({
  idExam: {type: Number, require: true,unique: true},
  numberOfRightAnswer: {type: Number,require: true},
  timeUsed: {type : Number}

})

const historySchema = new mongoose.Schema({
  history: {
    type: [examsSchema],
    default: []
  },
  createBy: {
    user: {type: id, ref: 'users',default: null},
  }

})
module.exports = mongoose.model('history',historySchema);
