/**
 * Created by Salman on 12/18/2017.
 */
require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log('a user connected');
    var user = "Salman";
    socket.emit("newMessage", generateMessage("Admin", `Welcome ${user} to chat app`));
    socket.broadcast.emit("newMessage", generateMessage("Admin", `${user} has been joined`));

    socket.on('createMessage', function(newMessage, callback){
        console.log('Create Message:', newMessage);
        socket.broadcast.emit("newMessage", generateMessage(newMessage.from, newMessage.text));
        callback();
    });

    socket.on("sendLocationMessage", function(location, callback){
        io.emit("newLocationMessage", generateLocationMessage("admin", location.lat, location.long));
    });

    //socket.on('newEmail', function(newEmail){
    //    console.log('New Email:', newEmail);
    //});

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


server.listen(port, ()=>{
    console.log(`App is started on port ${port}`);
});

module.exports = {app};