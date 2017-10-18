$(document).ready(function(){
    $('#join-box-button').click(function() {
    var newUser = {
        type:$('input[name=type]:checked').val(),
        firstName:$('input[name=FirstName]').val(),
        lastName:$('input[name=LastName]').val(),
        email:$('input[name=Email]').val(),
        zipCode:$('input[name=Location]').val(),
    };
    $.ajax({
           url: "http://thiman.me:1337/moxit/user",
           data: newUser,
           type: "POST",
           dataType : "json",
       })
       .done(function( json ) {
           var 
     });
    window.open('profile.html');
    });
    $()
});
