$(function () {
    $("#addParticipant_button").click(()=>{
        const route = $('#select-walls :selected').text();
        const points = $('#select-points :selected').val();
        const participant = $('#select-participant :selected').text();
        const [fname,lname] = participant.split(' ');

       // console.log('eeee,cos: ',route,points,participant,fname,lname);
        $.post('/add_participant',
        {
            fname,
            lname,
            route,
            points,
        },(data)=>{
            if(data === 'done') alert ('Send to server');
        });
    })
});