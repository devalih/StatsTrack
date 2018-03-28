$(function () {
    $.get("/routes", function (data, status) {
        let i = 1;
        console.log(data,status);
        data.forEach((elem) => {
            let route = JSON.stringify(elem).replace(/"/g, "");
            $('#select-walls').append(`<option value="${i}">${route}</option>`);
                i++;
        });
    });
});