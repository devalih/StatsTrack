
function upd_table() {
    $(".competitors-table").empty();
    setTimeout(() => {
        $.ajax({
            url: '/participants',
            success: function (result) {
                console.log('AJAX result', result);
                result.forEach((elem) => {

                    let firstname = JSON.stringify(elem.fname).replace(/"/g, ""),
                        lastname = JSON.stringify(elem.lname).replace(/"/g, ""),
                        routes = JSON.stringify(elem.finishedRoutes).replace(/"/g, ""),
                        result = JSON.stringify(sum(elem.result));
                    $(".competitors-table").append(
                        `<tr>
                            <td>${firstname}</td> 
                            <td>${lastname}</td>
                            <td>${routes}</td> 
                            <td>${result}</td>    
                        </tr>`);
                });
            },
            error: function (request, status, error) {
                serviceError();
            }
        });
    }, 10);
}
function addResultToRank(){
    $("#addResult_button").click(() => {
        const route = $('#select-walls :selected').text(),
            points = $('#select-points :selected').val(),
            participant = $('#select-participant :selected').text(),
            [fname, lname] = participant.split(' ');

        $.post('/participant/add_result',
            {
                fname,
                lname,
                route,
                points,
            }, (data) => {
                if (data.success) {
                    alert('Result was updated');
                    upd_table();
                }
                else
                    alert('Result was not updated, try again');
            });
    });
}
function deleteResult_button(){
    $("#deleteResult_button").click(() => {
        const route = $('#select-walls :selected').text(),
            participant = $('#select-participant :selected').text(),
            [fname, lname] = participant.split(' ');

        $.post('/participant/delete_result',
            {
                fname,
                lname,
                route
            }, (data) => {
                if (data.success) {
                    alert('Result was deleted');
                    upd_table();
                }
                else
                    alert('No result found to delete');
            });
    });
}
function addNewParticipant(){
    $("#addParticipant_button").click(() => {
        const fname = document.getElementById("fname").value,
            lname = document.getElementById("lname").value;
        $.post('/participant/new',
            {
                fname,
                lname,
            }, (data) => {
                if (data.success) {
                    alert('New user was added successfully!');
                    upd_table();
                }
                else
                    alert('This user has already been created');
            });
    })
}

function modifyParticipant(){
    $("#modifyParticipant_button").click(() => {
        const fname = document.getElementById("fname").value,
            lname = document.getElementById("lname").value,
            finishedRoutes = document.getElementById("finishedRoutes").value;
        $.post('/participant/change',
            {
                fname,
                lname,
                finishedRoutes
            }, (data) => {
                if (data.success) {
                    alert('User was modified successfully!');
                    upd_table();
                }
                else
                    alert('Error modifying user' + data.message);
            });
    })
}

$(function () {

    addResultToRank();
    deleteResult_button();
    addNewParticipant();

});