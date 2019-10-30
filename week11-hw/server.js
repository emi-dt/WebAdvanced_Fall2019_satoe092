// importing the module Im using here
var express = require('express');

var app =  express();

const port = process.env.PORT || 3000; 
var server = app.listen(port);

// whenever anyone goes to my site, I want them to see these files
app.use(express.static('public'));


console.log("Starting sercer at ${port}");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection: '+ socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        // io.sockets.emit('mouse', data);
        console.log(data);
    }


}