// $(function () {
//     // competitors-table
//     // $(".competitors-table").
//     $.get('/participants', function (data, status) {
//         data.forEach((elem) => {
//             let firstname = JSON.stringify(elem.fname).replace(/"/g, "");
//             let lastname = JSON.stringify(elem.lname).replace(/"/g, "");
//             let routes = JSON.stringify(elem.finishedRoutes).replace(/"/g, "");
//             // let number = JSON.stringify(elem.number).replace(/"/g, "");
//             let result = JSON.stringify(elem.result);
//             $(".competitors-table").append(
//                 `<tr>
//                     <td>${firstname}</td> 
//                     <td>${lastname}</td>
//                     <td>${routes}</td> 
//                     <td>${result}</td>    
//                 </tr>`);
//         });
//     });
// })

// $('#send_profile').click(function(event) {
//     event.preventDefault();

//     $.ajax({
//         global: false,
//         type: 'POST',
//         url: /user/change,
//         dataType: 'html',
//         data: {
//             name: $("#profile_name").val(),
//             surname: $("#profile_surname").val(),
//             age: $("#profile_age").val()
//         },
//         success: function (result) {
//             console.log(result);
//         },
//         error: function (request, status, error) {
//             serviceError();
//         }
//     });
// });