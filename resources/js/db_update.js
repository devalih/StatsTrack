console.log("html-script-db_update");
let participantList = [];
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAmg3qvDlorL-rCjMBbIKUO128xEdy1pCs",
    authDomain: "statstrack-kolkol.firebaseapp.com",
    databaseURL: "https://statstrack-kolkol.firebaseio.com",
    projectId: "statstrack-kolkol",
    storageBucket: "statstrack-kolkol.appspot.com",
    messagingSenderId: "1039433851013"
};
firebase.initializeApp(config);

function writeUserData(firstname, lastname, participantID, participantResult) {
    firebase.database().ref('participants/' + participantID).set({
        firstname,
        lastname,
        participantID,
        participantResult,
    });
}

function readUserData() {
    console.log("html-script-db_update-readUserData");
    let arr = []
    const participants = firebase.database().ref('participants');
    participants.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            arr.push(childSnapshot.val());
        });
    });
    participantList = arr;
    // return await participantList;
}

// function updateParticipantList(){
//     readUserData();

//     // setTimeout(() => {
//         let i = 0;
//         const selPartElem = document.getElementById("select-participant");
//         console.log("participantList: ", participantList);

//         participantList.forEach((elem) => {
//             console.log('elem:', elem);
//             $('#select-participant').append(`<option value="${i}">Name: ${elem.firstname} ${elem.lastname}</option>`);
//             i++;
//         });
// }
document.addEventListener('DOMContentLoaded', () => {
    var database = firebase.database();

    readUserData();
    const selPartElem = document.getElementById("select-participant");
    /**
     * 
     * 
     * 
     * добавляє все окей, але не добавляє ти дів елеметнів які воно пізніше виписує і показує, треба
     * додати, можливо вручну це все, що воно почало показувати, бо грузить воно його нормально 
     * кароче це моє наступне завдання
     * якщо шось можна то чекнути в html  щоб побачити де воно показує і що воно має показувати 
     * 
     * 
     * 
     */




    // setTimeout(() => {
    //     console.log("html-script-db_update-doc_listener-trying to add option to select");

    //     // let i = 0;

    //     console.log("selPartElem: ", selPartElem);
    //     console.log("participantList: ", participantList);

    //     participantList.forEach((elem) => {
    //         console.log('elem:', elem);
    //         $('#select-participant').append(`<option>Name: ${elem.firstname} ${elem.lastname}</option>`);
    //         i++;
    //     });
    // }, 2000);
    // console.log("data sent to DB! YOLO");
    // writeUserData('maksik wow', 'kolo', '15', '03:00:18');



    // const button_ = $("#submit_button");
    // $("#submit_button").click(function(){
    //     writeUserData('maks', 'kol', '12', '01:00:18');
    // });
})
