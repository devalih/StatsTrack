function upd_table() {
    // e.preventDefault();
    $(".competitors-table").empty();
    $.ajax({
        url: '/participants',
        success: function (result) {
            console.log('AJAX result',result);
            result.forEach((elem) => {
                let firstname = JSON.stringify(elem.fname).replace(/"/g, ""),
                    lastname = JSON.stringify(elem.lname).replace(/"/g, ""),
                    routes = JSON.stringify(elem.finishedRoutes).replace(/"/g, ""),
                    result = JSON.stringify(elem.result);
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
}

$(function () {
    $("#addResult_button").click(() => {
        const route = $('#select-walls :selected').text(),
            points = $('#select-points :selected').val(),
            participant = $('#select-participant :selected').text(),
            [fname, lname] = participant.split(' ');

        // console.log('eeee,cos: ',route,points,participant,fname,lname);
        $.post('/add_result',
            { fname, lname, route, points, },
            (data) => {
                if (data.success) {
                    upd_table();
                    alert('Result was updated');
                }
                else
                    alert('Result was not updated, try again');
            });
    });
    $("#addParticipant_button").click(() => {
        const fname = document.getElementById("fname").value,
            lname = document.getElementById("lname").value;
        $.post('/new_participant',
            {
                fname,
                lname,
            }, (data) => {
                if (data.success)
                    alert('New user was added successfully!');
                else
                    alert('This user has already been created');
            });
    })
});