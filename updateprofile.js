var updateUser;
$('#continue-button').click(function(){
    var tagArray = [];
    $( "li" ).each(function() {
        tagArray.push($(this).text());
      });             

    emailtosearch = $("input[name=email2").val();
    updateUser = {
        bio:$("#bio").val(),
        tags:tagArray,
        school:$('input[name=education').val(),
        password:$('input[name=password]').val(),
    }
    $.ajax({
        url:"http://localhost:3000/users",
        type:"GET"
    })
    .done(function( json ){
        var userList = json;
        for (var i = 0; i < userList.length; i++) {
            if (userList[i].email == emailtosearch){
                var userId = userList[i]._id;            
            }        
        }
        console.log(userId);
        updateUser._id=userId;
        $.ajax({
            url:"http://localhost:3000/users",
            data:updateUser,
            type:"PATCH",
        })
    })
});