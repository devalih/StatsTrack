$(function () {
    $.get('/participants', function (data, status) {
        // we are getting json from server with 
        // all participants and adding them to our
        // ranking table sorted according to the 
        // gained points
        data.forEach((elem) => {
            let firstname = JSON.stringify(elem.fname).replace(/"/g, "");
            let lastname = JSON.stringify(elem.lname).replace(/"/g, "");
            let routes = JSON.stringify(elem.finishedRoutes).replace(/"/g, "");
            let result = JSON.stringify(sum(elem.result));
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

