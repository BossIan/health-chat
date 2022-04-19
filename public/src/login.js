
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
        password: $('#pswtext').val()
    } 
    socket.emit('login' , data)
    socket.once('login success' ,function () {
        storage.setItem("login", "true");
        storage.setItem("email", $('#unametext').val());
        $('#login').text(storage.getItem("email"))
        jQuery(this).prev("login").attr("id","email");
        window.location.href = '/';
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
        password: $('#pswtext').val()
    }
    socket.emit('register', user)
    socket.once('registered already', function () {
        alert('Email already registered')
    })
    socket.once('register successful', function () {
        alert('Returning to Login')
        window.location.href = 'login.html';
    })
}
function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {
  
      return true;
  
    } else {
  
      alert("Invalid email address!");
  
      return false;
  
    }
  
  }