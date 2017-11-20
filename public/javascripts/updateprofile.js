var updateUser;
$('#continue-button').click(function(){
    var tagArray = [];
    $( "li" ).each(function() {
        tagArray.push($(this).text());
      });             

    emailtosearch = $("input[name=email2").val();
    updateUser = {
        email:emailtosearch,
        bio:$("#bio").val(),
        tags:tagArray,
        school:$('input[name=education').val(),
        password:$('input[name=password]').val(),
    }
    $.ajax({
        url:"/users",
        data:updateUser,
        type:"PATCH",
    })
    .done(function(json){
        window.location.replace("/users/login");
    })
});