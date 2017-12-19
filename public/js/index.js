/**
 * Created by Salman on 12/18/2017.
 */
var socket = io();

socket.on('connect', function(){
    console.log('connected to server.');
    //socket.emit('newEmail', {email: "sy@in-hq.com", title:"Hello Salman"});
    //socket.emit('createMessage', {from:"sy@in-hq.com", text:"some text"});
});

socket.on('disconnect', function(){
    console.log('disconnected from server.');
});

socket.on('newMessage', function(message){
    console.log("newMessage:",message);
    $('#messages').append('<li><b>'+message.from+'</b>: '+message.text+'</li>');
});

socket.on('newLocationMessage', function(newLocationMessage){
    console.log("newLocationMessage:",newLocationMessage);
    $('#messages').append('<li><b>'+newLocationMessage.from+'</b>: <a target="_blank" href="'+newLocationMessage.url+'">My location</a></li>');
});


$('form').submit(function(){
    var message = {text: $('#message').val(), from: 'user'};
    socket.emit('createMessage', message, function(data){
        console.log("got it", data);
        $('#messages').append('<li><b>'+message.from+'</b>: '+message.text+'</li>');
        $('#message').val('');
    });

    return false;
});

var locationButton = $("#send-location");

locationButton.on("click", function(){
    if(!navigator.geolocation){
        alert('your browser is not supporting geo location');
    }
    locationButton.attr('disabled', 'disabled').text("Send location ...");
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text("Send location");
        socket.emit('sendLocationMessage', {lat: position.coords.latitude, long: position.coords.longitude}, function(data){
        });
    },function(){
        locationButton.removeAttr('disabled').text("Send location");
        alert('unable to fetch location');
    });

});




