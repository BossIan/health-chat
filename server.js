const express = require('express');
const app = express();
const server = require("http").createServer(app);
const socket = require('socket.io');
const io = socket(server, {cors:{origin: "*",methods: ["GET", "POST"]}})
app.use('/', express.static('public'));
app.get('/', function(req, res) {

    var port = process.env.PORT;
  
    res.render(__dirname + "/public/index.html", {port:port});
  
  });
io.on('connection', function (socket) {
    socket.on('send message', function (message) {
         socket.broadcast.emit('message sent', message);
         console.log(message);
    })
})
server.listen(process.env.PORT, function () {
    console.log(`Listening on ${server.address().port} ${server.address().address}`);
  });