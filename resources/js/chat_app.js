const socket = io();
let usernames = [];
let history = '';

// send message, creating msg event so server
// can tell every client to update chat area coz
// new message is comming
function sendMessage() {
    socket.emit('msg', {
        nick: getCookie("username"),
        msg: $('#input_msg').val(),
    });
}

// set cookie for "exdays"
// in functions belowe we set it for a year (365 days)
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get this user's cookie so we can use it for our chat
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// check if cookie for given user was created before,
// if not, than create it now
function checkCookie() {
    let username = getCookie("username");
    if (username == "") {
       username = prompt("Please enter your full name:", "");
        if (username != "" && username != null) {
            if (usernames[username] == username){
                username+='_';
            }
            setCookie("username", username, 365);
        }
        usernames.push({username});
    }    
}
// listeting send message button if 
// it was clicked or not
$("#send_msg").click(function () {
    // if clicked "send message" send it
    sendMessage();
    // and clear input so you can send new message
    document.getElementById('input_msg').value = '';
});

// here we are listening on new event
// if if get something from server side
// newMsg, that means that someone texted something 
// and we need to take dat message and print it in 
// chat area
socket.on('newMsg', data => {
    const {nick, msg} = data;
    history += (nick + ': ' + msg).replace(/"/g, "") + '\n';
    $("#chat_area").html(history);
});

checkCookie();




