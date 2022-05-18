const { log } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { type } = require('os');
const app = express();
const server = require("http").createServer(app);
const socket = require('socket.io');
const io = socket(server, {cors:{origin: "*",methods: ["GET", "POST"]}})
var users = {};
app.use('/', express.static('public'), function () {
  visitUp()
});
const mongodbURL = 'mongodb+srv://DanicaRose:hatdoggaming@cluster0.e9jmu.mongodb.net/userdatabase?retryWrites=true&w=majority'
mongoose.connect(mongodbURL);
mongoose.connection.on('connected', function () {
  console.log('connected');
})
const userSchema = new Schema({ 
  name: String,
  email : String,
  password : String,
  admin: Boolean,
  reminders : Array,
  reminderschecked : Array,
  reminderstime : Array
});
const visitSchema = new Schema ({
  counter: Number,
  counters: Array
})
setInterval(() => {
  visits.findById('6281bffe00f21e7666d93b5b')
  .then(function (dbdata) {
    console.log(dbdata.counters);
    visits.findByIdAndUpdate('6281bffe00f21e7666d93b5b', {$push: { counters: dbdata.counter }})
    .then(function (dbdata) {
      console.log(dbdata.counters);
    })
  })
}, 8.64e+7);
const visits = mongoose.model('visits', visitSchema);
function visitUp() {
  visits.findByIdAndUpdate('6281bffe00f21e7666d93b5b', {$inc: {counter: 1}})
  .then(function (dbdata) {
    console.log(dbdata.counter);
  })
}
const user = mongoose.model('user', userSchema);
io.on('connection', function (socket) {
  console.log(socket.id + ' connected');
    users[socket.id] = {
      inroom: '',
      findingroom: false,
      userId: socket.id,
      socket : socket
    }
    socket.on('find match', function () { 
      if (users[socket.id].inroom != '') {
        socket.leave(users[socket.id].inroom)
        socket.to(users[socket.id].inroom).emit('match disconnected');
      }
     users[socket.id].inroom = '';
     users[socket.id].findingroom = true;
     for (const w in users) {
      if (w == socket.id || users[w].findingroom == false) continue
       var roomid = Math.floor(Math.random() * Date.now())
       if (users[w].inroom == '') {
         users[w].inroom = roomid
         users[socket.id].inroom = roomid
         socket.join(roomid);
         users[w].socket.join(roomid);
         console.log();
         io.in(roomid).emit('found match'); 
         users[socket.id].findingroom = false;
         users[w].findingroom = false;
         return
      }
     }
    })
    socket.on('viewCount', function () {
      visits.findById('6281bffe00f21e7666d93b5b')
      .then(function (dbdata) {
        socket.emit('viewCounted', dbdata)
       })
    })
    socket.on('send message', function (message) {
         socket.to(users[socket.id].inroom).emit('message sent', message);
    })
    socket.on('login', function (data) {
      user.find( { email: data.email, password: data.password} )
      .then(function (dbdata) {
        if (dbdata.length == 1) {
          socket.emit('login success', dbdata[0].admin)
        }
        else {
          socket.emit('login failed')
        }
      })
    })
    socket.on('reminders', function (data) {
      user.find( { email: data} )
      .then(function (dbdata) {
        if (dbdata.length == 1) {
          socket.emit('remindersSend', dbdata)
        }
        else {
        }
      })
    })
    socket.on('close', function (data) {
      user.find( { email: data[0]} )
      .then(function (dbdata) {
        if (dbdata.length == 1) {
          dbdata[0].reminders.splice(data[1], 1)
          dbdata[0].reminderschecked.splice(data[1], 1)
          dbdata[0].reminderstime.splice(data[1], 1)
            dbdata[0].save()
            .catch((error) => {
              //When there are errors We handle them here
              console.log(error);
      
          });
        }
        else {
        }
      })
    })
    socket.on('checked', function (data) {
      user.find( { email: data[0]} )
      .then(function (dbdata) {
        if (dbdata.length == 1) {
          if (data[1]) {
            dbdata[0].reminderschecked.splice(data[2], 1, 'checked')
          }
          else {
            dbdata[0].reminderschecked.splice(data[2], 1, 'false')
          }
            dbdata[0].save()
            .catch((error) => {
              //When there are errors We handle them here
              console.log(error);
      
          });
          
        }
        else {
        }
      })
    })
    socket.on('newList', function (data) {
      user.find( { email: data[0]} )
      .then(function (dbdata) {
        if (dbdata.length == 1) {
          dbdata[0].reminders.push(data[1])
          dbdata[0].reminderschecked.push('1')
          dbdata[0].reminderstime.push(data[2])
            dbdata[0].save()
            .catch((error) => {
              //When there are errors We handle them here
              console.log(error);
      
          });
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
    socket.on('disconnect', function () {
      if (users[socket.id]) {
        users[socket.id].findingroom = false;
        socket.to(users[socket.id].inroom).emit('match disconnected');
        users[socket.id].inroom = '';
        console.log(socket.id + ' disconnected');
        delete users[socket.id];
      }
    })
    socket.on('forcedisconnect', function () {
        users[socket.id].findingroom = false;
        socket.to(users[socket.id].inroom).emit('match disconnected');
        users[socket.id].inroom = '';
    })
})
server.listen(process.env.PORT || 8080, function () {
    console.log(`Listening on ${server.address().port}`);
  });
