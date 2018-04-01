$(function () {
    $("#deleteParticipant_button").click(() => {
        const [fname,lname] = $('#select-participant-delete :selected').text().split(" ");
        $.post('/participant/delete',
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