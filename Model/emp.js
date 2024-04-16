const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name:String,
    location:String,
    position:String,
    Salary:Number
})

const empmodel = mongoose.model('emp',schema);
module.exports = empmodel;