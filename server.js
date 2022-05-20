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
const feedbackSchema = new Schema ({
  message: String
})
const surveysSchema = new Schema({ 
  name: String,
  dateOfBirth : String,
  placeOfBirth : String,
  sex: String,
  civilStatus : String,
  citizenShip : String,
  mobileNumber : String,
  email : String,
  presentAddress : String,
  presentZipcode : String,
  permanentAddress : String,
  permanentZipcode : String,
  nameOfSchoolLastAttended: String,
  schoolAddress : String,
  schoolSector : String,
  highestAttainedGradeYearLevel : String,
  typeOfDisability : String,
  ipAffiliation : String,
  statusFather : String,
  statusMother : String,
  nameFather : String,
  nameMother : String,
  nameGuardian : String,
  addressFather : String,
  addressMother : String,
  addressGuardian : String,
  contactNumberFather : String,
  contactNumberMother : String,
  contactNumberGuardian : String,
  occupationFather : String,
  occupationMother : String,
  occupationGuardian : String,
  nameOfEmployerFather : String,
  nameOfEmployerMother : String,
  nameOfEmployerGuardian : String,
  employerAddressFather : String,
  employerAddressMother : String,
  employerAddressGuardian : String,
  highestEducationalAttainmentFather : String,
  highestEducationalAttainmentMother : String,
  highestEducationalAttainmentGuardian : String,
  totalParentsTaxableIncomeFather : String,
  totalParentsTaxableIncomeMother : String,
  totalParentsTaxableIncomeGuardian : String,
  dsdw : String,
  schoolEnroll : String,
  schoolAddress0 : String,
  typeOfSchool : String,
  degreeProgram : String,
  enjoying : String,
  signature : String,
  dateAccomplished : String,
  approved : String
});
const surveys = mongoose.model('surveys', surveysSchema);
const feedback = mongoose.model('feedback', feedbackSchema);
setInterval(() => {
  visits.findById('6281bffe00f21e7666d93b5b')
  .then(function (dbdata) {
    console.log(dbdata.counters);
    visits.findByIdAndUpdate('6281bffe00f21e7666d93b5b', {$push: { counters: dbdata.counter }})
    .then(function (dbdata) {
      console.log(dbdata.counters);
    })
  })
}, 86400000);
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
       surveys.find( { approved: 'true' } )
        .then( function (dbdata) {
          socket.emit('surveyApprove', dbdata)
        })
        feedback.find()
        .then( function (dbdata) {
          socket.emit('feedback', dbdata)
        })
    })
    socket.on('feedbackSend', function (feedbackdata) {
      var newfeedback = new feedback(feedbackdata)
      newfeedback.save()
      .then (function () {
        feedback.find()
        .then( function (dbdata) {
          socket.emit('feedback', dbdata)
        })
      })
    })
    socket.on('approve', function (id) {
      surveys.findByIdAndUpdate(id, {approved : 'true'})
      .then( function () {
        surveys.find( { approved: '' } )
        .then( function (dbdata) {
          socket.emit('surveyOne', dbdata[0])
        })
        surveys.find( { approved: 'true' } )
        .then( function (dbdata) {
          socket.emit('surveyApprove', dbdata)
        })
      })
    })
    socket.on('disapprove', function (id) {
      surveys.findByIdAndDelete(id)
      .then( function () {
        surveys.find( { approved: '' } )
        .then( function (dbdata) {
          socket.emit('surveyOne', dbdata[0])
        })
      })
    })
    socket.on('surveys', function () {
      surveys.find( { approved: '' } )
      .then( function (dbdata) {
        socket.emit('surveyOne', dbdata[0])
      })
    })
    socket.on('submitForm', function (data) {
      var newform = new surveys(data)
      newform.save()
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
