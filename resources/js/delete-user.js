$(function () {
    $("#deleteParticipant_button").click(() => {
        const [fname,lname] = $('#select-participant-delete :selected').text().split(" ");
        $.post('/delete_participant',
            {
                fname,
                lname,
            }, (data) => {
                if (data.success) {
                    alert('User was DELETED successfully!');
                    upd_table();
                }
                else
                    alert('This user doesnt exists');
            });
    })
});