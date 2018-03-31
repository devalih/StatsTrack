$(function () {
    // competitors-table
    // $(".competitors-table").
    $.get('/participants', function (data, status) {
        data.forEach((elem) => {
            let firstname = JSON.stringify(elem.fname).replace(/"/g, ""),
                lastname = JSON.stringify(elem.lname).replace(/"/g, ""),
                routes = JSON.stringify(elem.finishedRoutes).replace(/"/g, ""),
                result = JSON.stringify(elem.result);
            $(".competitors-table").append(
                `<tr>
                    <td>${firstname}</td> 
                    <td>${lastname}</td>
                    <td>${routes}</td> 
                    <td>${result}</td>    
                </tr>`);
        });
    });
})


// var xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 document.getElementById("txtHint").innerHTML = this.responseText;
//             }
//         };
//         xmlhttp.open("GET", "gethint.asp?q=" + str, true);
//         xmlhttp.send();