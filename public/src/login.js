function login() {
    if ($('#pswtext').val() == "") {
        alert("Enter Password")
        return
    }
    if ($('#unametext').val() == "") {
        alert("Enter Email")
        return
    }
    var emailandpassword = JSON.parse(localStorage.getItem("email and password"))
    var storage;
    if ($('#rememberme').val() == "on") {
        
        storage = localStorage
    }
    else {
        storage = sessionStorage
    }
    for (let i = 0; i < emailandpassword.length; i++) {
        if (emailandpassword[i] == $('#unametext').val() + "//"+ $('#pswtext').val()) {
            storage.setItem("login", "true");
            storage.setItem("email", $('#unametext').val());
            $('#login').text(storage.getItem("email"))
            jQuery(this).prev("login").attr("id","email");
            window.location.href = 'index.html';
        }
        else {
            console.log(emailandpassword[i]); 
        }
    }
    
}
function register() {
    var emailandpassword = JSON.parse(localStorage.getItem("email and password"))
    if (emailandpassword == null) {
        emailandpassword = []
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
    var localemailandpassword = $('#unametext').val() + "//"+ $('#pswtext').val()
    emailandpassword.push(localemailandpassword)
    localStorage.setItem("email and password", JSON.stringify(emailandpassword))
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