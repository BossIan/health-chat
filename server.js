const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { type } = require('os');
const app = express();
const server = require("http").createServer(app);
const socket = require('socket.io');
const io = socket(server, {cors:{origin: "*",methods: ["GET", "POST"]}})
app.use('/', express.static('public'));
const mongodbURL = 'mongodb+srv://DanicaRose:hatdoggaming@cluster0.e9jmu.mongodb.net/userdatabase?retryWrites=true&w=majority'
mongoose.connect(mongodbURL);
mongoose.connection.on('connected', function () {
  console.log('connected');
})
const userSchema = new Schema({ 
  name: String,
  email : String,
  password : String
   
});

const user = mongoose.model('user', userSchema);
app.get('/whyareyouhere', function (req, res) {
  user.find({})
  .then(function (data) {
    res.json(data)
  })
})
io.on('connection', function (socket) {
    socket.on('send message', function (message) {
         socket.broadcast.emit('message sent', message);
         console.log(message);
    })
    socket.on('login', function (data) {
      user.find( { email: data.email, password: data.password} )
      .then(function (dbdata) {
        if (dbdata.length == 1) {
          socket.emit('login success')
          console.log(dbdata);
        }
      })
    })
    socket.on('register', function (data) {
      user.find( { email: data.email } )
        .then(function (dbdata) {
          if (dbdata == '') {
            var newuser = new user(data)
            newuser.save()
            socket.emit('register successful')
          }
          else {
            socket.emit('registered already')
          }
        })
    })
})
server.listen(process.env.PORT || 8080, function () {
    console.log(`Listening on ${server.address().port} ${server.address().address}`);
  });