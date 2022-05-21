

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
var loading = "<img src='' alt='loading...' />";
$('.css').empty().append("<link rel='stylesheet' href='src/css/home.css'>')")
function changetab(tab) {
    if (tab == 'home') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/home.css'>')")
        $('.contents').empty().load('./home.html')
        return
    }
    if (tab == 'scholarship') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/scholarship.css'>')")
        $('.contents').empty().load('./scholarship.html')
        return
    }
    if (tab == 'hotlines') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/Hotlines.css'>')")
        $('.contents').empty().load('./hotlines.html')
        return
    }
    if (tab == 'reminders') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/reminders.css'>')")
        $('.contents').empty().load('./reminders.html')
        return
    }
    if (tab == 'dashboard') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/dashboard.css'>')")
        $('.contents').empty().load('./dashboard.html')
        return
    }
    if (tab == 'law') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/law.css'>')")
        $('.contents').empty().load('./law.html')
        return
    }
    if (tab == 'account') {
        $('.contents').empty().load('./account.html')
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