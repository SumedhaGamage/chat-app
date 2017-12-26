const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageSchema = new Schema({
  from: {
    type: String,
    require: true
  },
  text: {
    type: String
  },
  createdAt: {
    type: String
  }
});

const Message = mongoose.model('message', messageSchema);
module.exports = Message;