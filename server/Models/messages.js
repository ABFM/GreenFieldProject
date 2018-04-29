const mongoose = require('mongoose');


////message Schema
const messageSchema = mongoose.Schema({
  sender:{
    type: String,
    required: true
  },
  reciver:  {
    type: String,
    required: true
  },
  message:{
    type: String,
    required: true
  }
});

//Message Model
const Message = mongoose.model('Message', messageSchema);

module.exports.Message = Message;
