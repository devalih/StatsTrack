$(function () {
    $.get('/participants', function (data, status) {
        data.forEach((elem) => {
            let firstname = JSON.stringify(elem.fname).replace(/"/g, "");
            let lastname = JSON.stringify(elem.lname).replace(/"/g, "");
            $('#select-participant').append(`<option>${firstname} ${lastname}</option>`);
        });
    });
});