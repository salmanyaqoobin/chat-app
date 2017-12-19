/**
 * Created by Salman on 12/18/2017.
 */
var socket = io();

function scrollToBottom(){

    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");

    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }

}

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
    var fotmattedTime = moment(message.createdAt).format("h:mm a");
    //$('#messages').append('<li><b>'+message.from+'</b>: '+fotmattedTime+' '+message.text+'</li>');
    var template = $("#message_template").html();
    var html =  Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: fotmattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(newLocationMessage){
    console.log("newLocationMessage:",newLocationMessage);
    var template = $("#location_template").html();
    var fotmattedTime = moment(message.createdAt).format("h:mm a");
    var html =  Mustache.render(template, {
        url: newLocationMessage.url,
        from: newLocationMessage.from,
        createdAt: fotmattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});


$('form').submit(function(){
    var message = {text: $('#message').val(), from: 'user'};
    socket.emit('createMessage', message, function(data){
        console.log("got it", data);
        //$('#messages').append('<li><b>'+message.from+'</b>: '+message.text+'</li>');
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




