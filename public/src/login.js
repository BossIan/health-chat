
if (sessionStorage.getItem("login") == 'true' || localStorage.getItem("login") == 'true') {
    
    $('body').empty().load('./index2.html')
}
function login() {
    
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
    
        if (adminEmail($('#unametext').val())) {
            storage.setItem("login", "true");
            storage.setItem("admin", "true");
            storage.setItem("email", $('#unametext').val());
            $('#login').text(storage.getItem("email"))
            jQuery(this).prev("login").attr("id","email");
            window.location.href = '/';
            return
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
    socket.once('login failed' ,function () {
        alert('Invalid Email/Password')
    })
}
function register(admin) {
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
        reminderstime: '11:10 PM'
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
function adminEmail(email) {
    var validRegex = /^admin+[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+gmail+.+com$/
    if (email.match(validRegex)) {
  
        return true;
    
      }
      return false
}