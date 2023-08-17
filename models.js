const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    name:String,
    email:String,
    message:String,
    date:String,
    time:String
})

const emailModel = new mongoose.model('emailModel',emailSchema);

module.exports = {
    emailModel
}