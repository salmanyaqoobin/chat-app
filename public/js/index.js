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
});




