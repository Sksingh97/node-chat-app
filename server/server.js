const path = require('path');
const http = require('http');
const express = require('express');
const socketIO= require('socket.io');


const publicPath = path.join(__dirname,'../public');

const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log("New User Connected");

  socket.emit('newMessage',{
    from:"Admin",
    text:'Welcome to the chat app'
  });
  socket.broadcast.emit('newMessage',{
    from:"Admin",
    text:"New User Joined The Room"
  })
  // socket.emit('newMessage', {
  //   from: 'gokusan',
  //   text:'hey this is a reminder',
  //   createdAt : 123
  // });
  socket.on('createMessage',(message)=>{
    console.log('createMessage : ',message);



    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt: new Date().getTime()
    })

    // socket.broadcast.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt: new Date().getTime()
    // })
  })
  socket.on('disconnect',()=>{
    console.log('User disconnected');
  })
});


server.listen(port,()=>{
  console.log(`Server is up and running at ${port}`)
})
