$(function () {
    // here you are getting json from the server with all routes
    $.get('/routes', function (data, status) {
        let i = 1;
        data.forEach((elem) => {
            let route = JSON.stringify(elem).replace(/"/g, "");
            $('#select-walls').append(`<option value="${i}">${route}</option>`);
                i++;
        });
    });
});