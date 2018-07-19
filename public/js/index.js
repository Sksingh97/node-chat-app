var socket = io();

socket.on('connect',function (){
  console.log("connected to server");
});

socket.on('disconnect',function(){
  console.log("Disconnected from server");
});

socket.on('newMessage',function(msg){
  console.log('got new msg: ',msg);
})
// 
// socket.emit('createMessage',{
//   from:'gokusan',
//   text:"ha ha i remenr it",
// })
