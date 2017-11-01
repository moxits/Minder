$('#login-box-button').click(function(){
    var userName = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    $.ajax({
        url:"http://localhost:3000/users/loginUser",
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
            window.location.replace("http://localhost:3000/users/profile-page");
        }
        })
    });