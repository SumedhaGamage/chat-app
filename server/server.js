const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {
  generateMessage
} = require('./utils/message');

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
    io.emit('newMessage', generateMessage(message.from, message.text));
  });
});


server.listen(3000, () => {
  console.log('app is up and running');
});