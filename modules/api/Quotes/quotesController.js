const quotes = require('./quotesModel');

var getRandomQuote =(cb) => {
  quotes.aggregate(
   { $sample: { size: 1 } }
 ).exec((err,doc) => {
    if(err) return cb(err);
    else return cb(null,doc);
  })
}

var writeQuote = (data,cb) => {
  quotes.create(data,(err,doc) => {
    if(err) {
      console.log(err);
      return cb(err);
    }else{
      return cb(null,doc);
    }
  })
}
module.exports = {
  getRandomQuote,
  writeQuote
}
