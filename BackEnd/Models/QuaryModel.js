const mongoose = require('mongoose');


const quarySchema = mongoose.Schema({
    name : String , 
    email : String , 
    quary : String,
    responded  : Boolean
});

const QuaryModel = mongoose.model('quary',quarySchema);

module.exports = QuaryModel;