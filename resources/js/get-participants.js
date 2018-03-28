$(function () {
    $.get("http://localhost:3000/database/participants-db.json", function (data, status) {
        data.forEach((elem) => {
            let firstname = JSON.stringify(elem.fname).replace(/"/g, "");
            let lastname = JSON.stringify(elem.lname).replace(/"/g, "");
            $('#select-participant').append(`<option>${firstname} ${lastname}</option>`);
        });
    });
});