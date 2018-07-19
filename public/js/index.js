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
socket.on('newLocationMessage',function(message){
  var li = $('<li></li>');
  var a =$('<a target="_blank">My current Location</a>');

  li.text(`${message.from}:`);
  a.attr('href',message.url);
  li.append(a);
  $('#messages').append(li);
});

// socket.emit('createMessage',{
//   from:'gokusan',
//   text:"ha ha i remenr it",
// },function(data){
//   console.log(data);
// });


$('#message-form').on('submit',function(e){
  e.preventDefault();
var messageTextbox = $('[name=message]')
  socket.emit('createMessage',{
    from:'user',
    text:messageTextbox.val()
  },function(){
    messageTextbox.val('')
  });
})

var locationButton = $('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('geolocation not supported by your browser');
  }
  locationButton.attr('disabled',"disabled").text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Sending location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
    })
  },function(){
    locationButton.removeAttr('disabled').text('Sending location');
    alert('unable to fetch location');
  })
})
