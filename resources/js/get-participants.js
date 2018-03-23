$(function () {

    $.get("http://localhost:3000/database/participants-db.json", function (data, status) {
        const selPartElem = document.getElementById("select-participant");
        data.forEach((elem) => {
            let firstname = JSON.stringify(elem.fname).replace(/"/g, "");
            let lastname = JSON.stringify(elem.lname).replace(/"/g, "");
            console.log('elem:', elem);
            $('#select-participant').append(`
                    <option>
                    ${firstname} ${lastname}
                    </option>
                `);
        });
    });
});