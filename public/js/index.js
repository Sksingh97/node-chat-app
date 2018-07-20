var socket = io();

function scrollToBottom(){


var message = $('#messages');
var newMessage = message.children('li:last-child')
var clientHeight = message.prop('clientHeight');
var scrollTop = message.prop('scrollTop');
var scrollHeight = message.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
  message.scrollTop(scrollHeight);
}
}

socket.on('connect',function (){
  console.log("connected to server");
});

socket.on('disconnect',function(){
  console.log("Disconnected from server");
});

socket.on('newMessage',function(msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text:msg.text,
    from:msg.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
  // console.log('got new msg: ',msg);
  // var formattedTime = moment(msg.createdAt).format('h:mm a');
  // var li = $('<li></li>');
  // li.text(`${msg.from} ${formattedTime}: ${msg.text}`)
  //
  // $('#messages').append(li);
});
socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html=Mustache.render(template,{
    from:message.from,
    url:message.url,
    createdAt:formattedTime
  })
  // var li = $('<li></li>');
  // var a =$('<a target="_blank">My current Location</a>');
  //
  // li.text(`${message.from} ${formattedTime}:`);
  // a.attr('href',message.url);
  // li.append(a);
  $('#messages').append(html);
    scrollToBottom();
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
