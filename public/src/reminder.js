var login = sessionStorage.getItem('login') || localStorage.getItem("login");
if (login == 'false' || login == null) {
    $('body').append('<div class="modal"><div class="modal-div"><div class="div-placeholder"></div><div class="sign-in-block"><div class="sign-in-cont-block"><div class="sign-in-cont-text">Sign in to continue</div></div><div class="sign-in-desc"><span>To use this feature, you must be signed in.</span><div class="placeholder"></div></div><div class="span-wide-div"><div class="span-div" onclick="window.location.href = \'login.html\';"><span class="span-msg"><span class="span-msg-in">SIGN IN</span></span></div></div></div><div class="div-placeholder"></div></div>');
} 
else {
    $('.reminders-block').load("./reminders-content.html")
}

function newList() {
    if ($('#titleInput').val() == '') {
        alert("Enter Title")
        return
    }
    if ($('#timeInput').val() == "") {
        alert("Enter Time")
        return
    }
    function validateHhMm() {
        let isValid = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test($('#timeInput').val());
        return isValid
    }
    
    if (validateHhMm() == false) {
        alert("Enter Proper Time xx:xx")
        return
    }
    var AmPm;
    var time;
    if ($('#timeInput').val()[0] == 1 && $('#timeInput').val()[1] >= 3 || $('#timeInput').val()[0] == 2) {
        var timemath = parseInt($('#timeInput').val())
        AmPm = 'PM';
        timemath -= 12
        time = $('#timeInput').val()
        String(timemath)
        time = time.substr(2, time.length)
        time = `${timemath}${time}`
    } 
    else {
        AmPm = $('.AmPm').val()
        time = $('#timeInput').val();
    }
    var newlis = [ $('#login').text() ,$('#titleInput').val(), time + ' ' + AmPm]
    socket.emit('newList', newlis)
    $('#reminders-list').append('<li>'+ $('#titleInput').val() +'<span class="close">×</span> <span class="time">'+ time + ' ' + AmPm +'</span></li>')
    var close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      this.classList.remove('close')
      var logindata = $('#login').text()
      var userdata = [ logindata , i]
        socket.emit('close', userdata)
        location.reload();
      }
    }
      let list = $('#reminders-list li')
      for (let i = 0; i < list.length; i++) {
        list[i].onclick = function() {
          if (this.style.display == "none") {
            return
          }
          var checked = list[i].classList.toggle("checked");
          var logindata = $('#login').text()
        var userdata = [ logindata , checked, i]
        console.log('made');
          socket.emit('checked', userdata)
          }
        }
    }
    socket.emit('reminders', $('#login').text())
    socket.on('remindersSend', function (dbdata) {
        data = dbdata[0]
        for (let i = 0; i < data.reminders.length; i++) {
            $('#reminders-list').append('<li class="'+ data.reminderschecked[i] + '">'+ data.reminders[i] +'<span class="close">×</span> <span class="time">' + data.reminderstime[i] +'</span></li>')
        }
       
        var close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      this.classList.remove('close')
      var logindata = $('#login').text()
      var userdata = [ logindata , i]
        socket.emit('close', userdata)
        location.reload();
      }
    }
    let list = $('#reminders-list li')
    for (let i = 0; i < list.length; i++) {
        list[i].onclick = function() {
          if (this.style.display == "none") {
            return
          }
        var checked = list[i].classList.toggle("checked");
        var logindata = $('#login').text()
      var userdata = [ logindata , checked, i]
      console.log('server');
        socket.emit('checked', userdata)
        }
      }
    })