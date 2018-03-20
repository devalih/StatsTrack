let participantList = [];

function writeUserData(firstname, lastname, participantID, participantResult) {
    firebase.database().ref('participants/' + participantID).set({
        firstname,
        lastname,
        participantID,
        participantResult,
    });
}

function readUserData() {
    const participants = firebase.database().ref('participants');
    participants.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            participantList.push(childSnapshot.val());
        });
    });
}

$(function () {
    var database = firebase.database();
    // setTimeout(()=>{

    // console.log("data sent to DB! YOLO");
    // writeUserData('maksik wow', 'kolo', '15', '03:00:18');
    readUserData();
    console.log("participantList: ", participantList);
    
    const selPartElem = document.getElementById("select-participant");
    console.log("selPartElem: ", selPartElem);
    // }, 3000);

    // $('#mySelect').append("<option>BMW</option>")

    // const button_ = $("#submit_button");
    // console.log(button_);
    // $("#submit_button").click(function(){
    //     console.log("data sent to DB! YOLO");
    //     writeUserData('maks', 'kol', '12', '01:00:18');
    // });
});



