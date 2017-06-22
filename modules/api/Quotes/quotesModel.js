const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const quotesSchema = new mongoose.Schema({
  quote : {type: String}
})
module.exports = mongoose.model('quotes',quotesSchema);
