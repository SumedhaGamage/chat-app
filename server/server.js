const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {
  generateMessage
} = require('./utils/message');
const mongoose = require('mongoose');
const Message = require('./model/message');
//mongoose.Promise = Promise.global;
mongoose.connect(`mongodb://mongo:27017/chat`);
const publicPath = path.join(__dirname + '/../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessge', (message) => {
    let newMessage = generateMessage(message.from, message.text);
    Message.create(newMessage)
      .then(() => {
        io.emit('newMessage', newMessage);
      });
  });
});


server.listen(3000, () => {
  console.log('app is up and running');
});