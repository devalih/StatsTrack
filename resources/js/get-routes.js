$(function () {
    $.get("http://localhost:3000/database/routes-db.json", function (data, status) {
        let i = 1;
        data.forEach((elem) => {
            let route = JSON.stringify(elem).replace(/"/g, "");
            $('#select-walls').append(`<option value="${i}">${route}</option>`);
                i++;
        });
    });
});