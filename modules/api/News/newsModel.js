const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new mongoose.Schema({
  title: {type: String,required: true},
  imageLink : {type : String},
  content: {type: String},
  brief: {type: String},
  catology: {type: String}
})
module.exports = mongoose.model('news',newsSchema);
