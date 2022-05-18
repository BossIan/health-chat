
function login() {
    if ($('#pswtext').val() == "") {
        alert("Enter Password")
        return
    }
    if ($('#unametext').val() == "") {
        alert("Enter Email")
        return
    }
    var storage;
    if ($('#rememberme').val() == "on") {
        
        storage = localStorage
    }
    else {
        storage = sessionStorage
    }
    var data = {
        name: $('#unametext').val(),
        email: $('#unametext').val(),
        password: $('#pswtext').val(),
        admin: false
    } 
    socket.emit('login' , data)
    socket.once('login success' ,function (data) {
        storage.setItem("login", "true");
        storage.setItem("email", $('#unametext').val());
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
function register() {
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