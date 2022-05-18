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
$('.css').empty().append("<link rel='stylesheet' href='src/css/home.css'>')")
var spinner = "<img src='http://i.imgur.com/pKopwXp.gif' alt='loading...' />";
function changetab(tab) {
    if (tab == 'home') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/home.css'>')")
        $('.contents').load('./home.html')
        return
    }
    if (tab == 'scholarship') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/scholarship.css'>')")
        $('.contents').load('./scholarship.html')
        return
    }
    if (tab == 'hotlines') {
        $('.css').empty().append("<link rel='stylesheet' href='src/css/Hotlines.css'>')")
        $('.contents').load('./hotlines.html')
        return
    }
    if (tab == 'reminders') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/reminders.css'>')")
        $('.contents').load('./reminders.html')
        return
    }
    if (tab == 'login') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/login.css'>')")
        $('.contents').load('./login.html')
        return
    }
    if (tab == 'dashboard') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/dashboard.css'>')")
        $('.contents').load('./dashboard.html')
        return
    }
    if (tab == 'law') {
        $('.css').empty().append("'<link rel='stylesheet' href='src/css/law.css'>')")
        $('.contents').load('./law.html')
        return
    }
    if (tab == 'account') {
        $('.contents').load('./account.html')
        return
    }
}

if (admin == 'true') {
    $('.tab').append('<li><a id="dashboard" class="tabs" onclick="changetab(\'dashboard\')">Dashboard</a></li>')
}
