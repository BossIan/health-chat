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
    $('#login').attr("href","account.html");
}
var topnav = document.getElementsByTagName("ul")
window.onscroll = function () {
    if (screen.width <= 600) {
        return
    }
    if (document.body.scrollTop == 0) {
        topnav[0].style.background='transparent';
    } else {
        topnav[0].style.background='#575757';
    }
}
