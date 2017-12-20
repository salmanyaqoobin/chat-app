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
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log('a user connected');


    socket.on('join', (params, callback)=>{
        var name = params.name;
        var room = params.room;
        if(!isRealString(name) || !isRealString(room)){
            return callback('name and room is required');
        } else {
            socket.join(params.room);
            //socket.leave("room name");
            // io.emit ->io.to("salman room").emit                                  (this will send message to all connected clients)
            // socket.broadcast.emit -> socket.broadcast.to("salman room").emit     (this will sent to all user expect the sender user)
            // socket.emit ->                                                       (this will only send to one user)

            users.removeUser(socket.id);
            users.addUser(socket.id, name, room);

            io.to(room).emit("updateUsersList", users.getUsersList(room));

            socket.emit("newMessage", generateMessage("Admin", `Welcome ${name} to chat app at ${room} room`));
            socket.broadcast.to(room).emit("newMessage", generateMessage("Admin", `${name} has been joined`));

            callback();
        }
    });

    socket.on('createMessage', function(newMessage, callback){
        io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));
        callback('ss');
    });

    socket.on("sendLocationMessage", function(location, callback){
        io.emit("newLocationMessage", generateLocationMessage("admin", location.lat, location.long));
    });

    //socket.on('newEmail', function(newEmail){
    //    console.log('New Email:', newEmail);
    //});

    socket.on('disconnect', function(){
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit("updateUsersList", users.getUsersList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has been left.`));
        }
    });
});


server.listen(port, ()=>{
    console.log(`App is started on port ${port}`);
});

module.exports = {app};