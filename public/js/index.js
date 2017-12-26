var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function listenToNewMessage(message) {
  addElement(message);
});

function addElement(message) {
  // create a new div element
  var newDiv = document.createElement("div");
  // and give it some content
  var newContent = document.createTextNode(`from: ${message.from} \n text: ${message.text} \n createdAt : ${message.createdAt}`);
  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
};

function sendMessage() {
  let from = document.getElementById('form')
    .value
  let text = document.getElementById('text')
    .value
  socket.emit('createMessge', generateMessage(from, text));

};

var generateMessage = function generateMessage(from, text) {
  return {
    from,
    text,
    createdAt: new Date()
      .getTime()
  }
};