
function login(admin) {
    if (admin) {
        if ($('#adminpswtext').val() == "") {
            alert("Enter Password")
            return
        }
        if ($('#adminunametext').val() == "") {
            alert("Enter Email")
            return
        }
        var storage;
        if ($('#adminrememberme').val() == "on") {
            var storage;
            storage = localStorage
            }
            else {
                storage = sessionStorage
            }
    }   else {
        if ($('#pswtext').val() == "") {
            alert("Enter Password")
            return
        }
        if ($('#unametext').val() == "") {
            alert("Enter Email")
            return
        }
        if ($('#rememberme').val() == "on") {
            var storage;
            storage = localStorage
            }
            else {
                storage = sessionStorage
            }
    }
        
    if (admin) {
        var data = {
            name: $('#adminunametext').val(),
            email: $('#adminunametext').val(),
            password: $('#adminpswtext').val()
        } 
    } else {
        var data = {
            name: $('#unametext').val(),
            email: $('#unametext').val(),
            password: $('#pswtext').val()
        } 
    }
    
    socket.emit('login' , data)
    socket.once('login success' ,function (data) {
        storage.setItem("login", "true");
        if (admin) {
            storage.setItem("email", $('#adminunametext').val());
        } else {
            storage.setItem("email", $('#unametext').val());
        }
        $('#login').text(storage.getItem("email"))
        jQuery(this).prev("login").attr("id","email");
        if (data) {
            storage.setItem("admin", "true");
        }
        window.location.href = '/';
    })
    socket.once('login failed' ,function () {
        alert('Invalid Email/Password')
    })
}
function register(admin) {
    if (admin) {
        if (ValidateEmail($('#adminunametext').val()) == false) {
            return
        }
        if ($('#adminpswtext').val() == "") {
            alert("Enter Password")
            return
        }
        if ($('#adminpswtext').val() == "") {
            alert("Enter Email")
            return
        }
        var user = {
            name: $('#adminunametext').val(),
            email: $('#adminunametext').val(),
            password: $('#adminpswtext').val(),
            reminders: 'Drink Water',
            reminderschecked: '',
            reminderstime: '11:10 PM',
            admin: true
        }
        socket.emit('register', user)
        socket.once('registered already', function () {
            alert('Email already registered')
        })
        socket.once('register successful', function () {
            alert('Returning to Login')
            window.location.href = '';
        })
        return      
    }
    if (ValidateEmail($('#unametext').val()) == false) {
        return
    }
    if ($('#pswtext').val() == "") {
        alert("Enter Password")
        return
    }
    if ($('#unametext').val() == "") {
        alert("Enter Email")
        return
    }
    var user = {
        name: $('#unametext').val(),
        email: $('#unametext').val(),
        password: $('#pswtext').val(),
        reminders: 'Drink Water',
        reminderschecked: '',
        reminderstime: '11:10 PM',
        admin: false
    }
    socket.emit('register', user)
    socket.once('registered already', function () {
        alert('Email already registered')
    })
    socket.once('register successful', function () {
        alert('Returning to Login')
        window.location.href = '';
    })
}
function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+bulsu+.+edu+.+ph$/;
  
    if (input.match(validRegex)) {
  
      return true;
  
    } else {
  
      alert("Invalid email address!");
  
      return false;
  
    }
  
  }