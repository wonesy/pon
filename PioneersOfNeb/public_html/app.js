var express = require('express');
var app = express();
var server = require('http').createServer(app);
server.listen('8080', '127.0.0.1');
var io = require('socket.io').listen(server);

//app.listen(8080);

// routing
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {
    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
        // we tell the client to execute 'updatechat' with 2 params
        io.sockets.emit('updatechat', socket.username, data);
    });

    // whent he client emits 'adduser', this listens and executes
    socket.on('adduser', function (username) {
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        // echo to client that they're connected
        socket.emit('updatechat', 'SERVER', 'you have connected');
        // echo globally (to all clients) that a person has joined
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
        // update the list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
    });

    // when the user discs, this will execute
    socket.on('disconnect', function () {
        // remove user from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + 'has disconnected');
    });
});
