var newUser;
$('#join-box-button').click(function() {
    newUser = {
        type:$('input[name=type]:checked').val(),
        firstName:$('input[name=FirstName]').val(),
        lastName:$('input[name=LastName]').val(),
        email:$('input[name=Email]').val(),
        location:$('input[name=Location]').val(),
    };
    $.ajax({
           url: "http://localhost:3000/users",
           data: newUser,
           type: "POST",
       })
       .done(function( json ) {
           var userID = json._id;
           return newUser;
     });
     window.location.replace("http://localhost:3000/users/profile");
});


