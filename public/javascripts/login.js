$('#login-box-button').click(function(){
    var userName = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    $.ajax({
        url:"/users/loginUser",
        data:{
            email:userName,
            password:password,
        },
        type:"POST"
    })
    .done(function(json){
        console.log(json);
        if (json===false){
            alert('Incorrect Username or Password');
        }else{
            window.location.replace("/users/profile-page");
        }
        })
    });