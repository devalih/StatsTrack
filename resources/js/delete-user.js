$(function () {
    $("#deleteParticipant_button").click(() => {
        const   fname = document.getElementById("fname_del").value,
                lname = document.getElementById("lname_del").value;
        $.post('/delete_participant',
            {
                fname,
                lname,
            }, (data) => {
                if (data.success)
                    alert('User was DELETED successfully!');
                else
                    alert('This user doesnt exists');
            });
    })
});