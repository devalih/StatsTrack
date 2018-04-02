const socket = io();
let usernames = [];
let history = '';

function sendMessage() {
    socket.emit('msg', {
        nick: getCookie("username"),
        msg: $('#input_msg').val(),
    });
    // $('#input_msg').val() = '';
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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
function checkCookie() {
    let username = getCookie("username");
    console.log("usernames[username]: " + usernames[username]);
    if (username == "") {
       username = prompt("Please enter your full name:", "");
        if (username != "" && username != null) {
            // console.log("usernames[username]: " + usernames[username]);
            if (usernames[username] == username){
                username+='_';
            }
            setCookie("username", username, 365);
        }
        usernames.push({username});
        console.log(usernames);
    }    
}

$("#send_msg").click(function () {
    sendMessage();
    document.getElementById('input_msg').value = '';
});

socket.on('newMsg', data => {
    const {nick, msg} = data;
    history += (nick + ': ' + msg).replace(/"/g, "") + '\n';
    $("#chat_area").html(history);
});

checkCookie();




