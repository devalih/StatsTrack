$(function () {
    // competitors-table
    // $(".competitors-table").
    $.get('/participants', function (data, status) {
        data.forEach((elem) => {
            let firstname = JSON.stringify(elem.fname).replace(/"/g, "");
            let lastname = JSON.stringify(elem.lname).replace(/"/g, "");
            let routes = JSON.stringify(elem.finishedRoutes).replace(/"/g, "");
            let result = JSON.stringify(elem.result);
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


{/* <tbody class="competitors-table">
<tr>
    <td>Item</td>
    <td>Item</td>
    <td>Item</td>
    <td>Item</td>
</tr>
</tbody> */}