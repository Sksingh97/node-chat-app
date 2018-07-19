var socket = io();

socket.on('connect',function (){
  console.log("connected to server");
});

socket.on('disconnect',function(){
  console.log("Disconnected from server");
});

socket.on('newMessage',function(msg){
  console.log('got new msg: ',msg);
  var li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`)

  $('#messages').append(li);
});

socket.emit('createMessage',{
  from:'gokusan',
  text:"ha ha i remenr it",
},function(data){
  console.log(data);
});


$('#message-form').on('submit',function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from:'user',
    text:$('[name=message]').val()
  },function(){

  });
})
