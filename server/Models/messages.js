const mongoose = require('mongoose');


////message Schema
const messageSchema = mongoose.Schema({
  sender:String,
  reciver:  String,
  date: Date,
  message:String
});

//Message Model
const Message = mongoose.model('Message', messageSchema);

module.exports.Message = Message;
