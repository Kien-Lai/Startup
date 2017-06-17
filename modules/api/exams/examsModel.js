const mongoose= require('mongoose');
const Schema= mongoose.Schema;

var exams= new Schema({
    id: {type: Number, required: true, unique : true},
    school: {type: String, required: true,text: true},
    subject: {type: String, required: true},
    numberOfQuestions: {type: Number, required: true},
    answers:{type: Array},
    examspath:{type:String},
    level:{type:String,required:true},
    year:{type: String},
    name: {type: String, required: true, unique:true}
},{timestamps : true})

exams.index({name : 'text'});

module.exports = mongoose.model('exams',exams);
