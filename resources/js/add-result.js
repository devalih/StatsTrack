$(function () {
    $("#addResult_button").click(() => {
        const route = $('#select-walls :selected').text(),
            points = $('#select-points :selected').val(),
            participant = $('#select-participant :selected').text(),
            [fname, lname] = participant.split(' ');

        // console.log('eeee,cos: ',route,points,participant,fname,lname);
        $.post('/add_result',
            {
                fname,
                lname,
                route,
                points,
            }, (data) => {
                if (data.success)
                    alert('Result was updated');
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
                lname,s
            }, (data) => {
                if (data.success)
                    alert('New user was added successfully!');
                else
                    alert('This user has already been created');
            });
    })
});