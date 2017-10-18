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
           var userID = json._id;
     });
    window.open('profile.html','_self');
    });
    $('#continue-button').click(function(){
        newUser.bio = $('#bio').val();
        newUser.tags = [];
        $('ul li').each(function(){
            newUser.tags.push($(this).text());
        })
        newUser.education=$('input[name=education]').val();
        $.ajax({
            url: "http://thiman.me:1337/moxit/user/"
        }

        )

    })
});