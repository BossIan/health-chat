

var storage;
if (sessionStorage.getItem("login") == null) {
    storage = localStorage
}
else {
    storage = sessionStorage
}
var login = storage.getItem("login");
if (login == 'true') {
    $('#login').text(storage.getItem("email"))
    $('#login').attr("onClick","changetab('account')");
}
const admin = storage.getItem("admin");
var topnav = document.getElementsByTagName("ul")
window.onscroll = function () {
    if (screen.width <= 600) {
        return
    }
    if (document.body.scrollTop == 0) {
        topnav[0].style.background='transparent';
    } else {
        topnav[0].style.background='var(--dark)';
    }
}
var spinner = "<img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' alt='loading...' />";
$('.css').empty().append("<link rel='stylesheet' href='src/css/home.css'>')")
function changetab(tab) {
    if (tab == 'home') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/home.css'>')")
        $('.contents').html(spinner).load('./home.html')
        return
    }
    if (tab == 'scholarship') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/scholarship.css'>')")
        $('.contents').html(spinner).load('./scholarship.html')
        return
    }
    if (tab == 'hotlines') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/Hotlines.css'>')")
        $('.contents').html(spinner).load('./hotlines.html')
        return
    }
    if (tab == 'reminders') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/reminders.css'>')")
        $('.contents').html(spinner).load('./reminders.html')
        return
    }
    if (tab == 'login') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/login.css'>')")
        $('.contents').html(spinner).load('./login.html')
        return
    }
    if (tab == 'dashboard') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/dashboard.css'>')")
        $('.contents').html(spinner).load('./dashboard.html')
        return
    }
    if (tab == 'law') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/law.css'>')")
        $('.contents').html(spinner).load('./law.html')
        return
    }
    if (tab == 'account') {
        $('.contents').html(spinner).load('./account.html')
        return
    }
}

if (admin == 'true') {
    $('.tab').append('<li><a id="dashboard" class="tabs" onclick="changetab(\'dashboard\')">Dashboard</a></li>')
}
function feedbackclick() {
    if ($('#feedbackid').val() != '') {
        var data =  {
            message : $('#feedbackid').val(),
            sender : storage.getItem("email")
        }
        $('#feedbackid').val('')
        socket.emit('feedbackSend', data)
    } else {
        alert('Input feedback')
    }
}