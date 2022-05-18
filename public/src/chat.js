const socket = io();
var collapsible = document.getElementsByClassName('collapsible');

for (let i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener('click', function () {
        this.classList.toggle('active')
        var content = this.nextElementSibling;
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    })
    
}

function getTime (){
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if ( hours < 10){
        hours = "0" + hours
    }
    if ( minutes < 10){
        minutes = "0" + minutes
    }
    let time = hours + ":" + minutes
    return time;
}

function firstBotMessage() {
    let firstMessage = "Greetings!"
    document.getElementById('botStarterMessage').innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>'
    let time = getTime();

    $(".chat-timestamp").append(time)
    document.getElementById("userInput").scrollIntoView(false) 
}
firstBotMessage();

function getHardResponse(Text) {
    getBotResponse(Text).then(
        function(value) { 
        if (value.answer == undefined) {
            value.answer = "I'm sorry, I cannot reply to that message. Please rely on the other chat for this situation."
        }
        let botHtml = '<p class="botText"><span>' + value.answer + '</span></p>'
        $("#bot-chat").append(botHtml)
    
        document.getElementById('chat-bar-bottom').scrollIntoView(true) },
      );
    
}
function getResponse() {
    let userText = $('#textInput').val();
    $('#textInput').val("")
    if (userText == "") {
        return
    }
    let userHtml = '<p class="userText"><span>' + userText + '</span></p>'
    if (document.getElementById('bot-chat').style.display == 'none') {
        socket.emit('send message' , userText)
        $('#chat-chat').append(userHtml)
        document.getElementById('chat-bar-bottom').scrollIntoView(true)
        return
    }
    $('#bot-chat').append(userHtml)
    document.getElementById('chat-bar-bottom').scrollIntoView(true)
    setTimeout(() => {
        getHardResponse(userText)
    }, 1000)
}
function sendButton(){
    getResponse()
}

$('#textInput').keypress(function (a) {
    if (a.which == 13) {
        getResponse()
    }
})
socket.on('message sent', function (message) {
    let userHtml = '<p class="botText"><span>' + message + '</span></p>'
    $('#chat-chat').append(userHtml)
    document.getElementById('chat-bar-bottom').scrollIntoView(true)
})
$('#chatid').click(function() {
    socket.emit('find match')
    let userHtml = '<p class="botText"><span>Finding match</span></p>'
    $('#chat-chat').append(userHtml)
    $('#chatid').text('Find Match')
  });
  $('#btid').click(function() {
    $('#chatid').text('Chat')
    socket.emit('forcedisconnect')
  });
  socket.on('found match', function (message) {
    let userHtml = '<p class="botText"><span>Match found</span></p>'
    $('#chat-chat').append(userHtml)
    document.getElementById('chat-bar-bottom').scrollIntoView(true)
})
socket.on('match disconnected', function (message) {
    var userHtml = '<p class="botText"><span>Stranger has disconnect</span></p>';
    $('#chat-chat').append(userHtml)
    document.getElementById('chat-bar-bottom').scrollIntoView(true);
})