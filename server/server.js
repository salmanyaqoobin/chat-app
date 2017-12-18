/**
 * Created by Salman on 12/18/2017.
 */
require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log('a user connected');


    socket.on('createMessage', function(newMessage){
        console.log('Create Message:', newMessage);
        socket.emit("newMessage", {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: Date.timestamp
        });
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