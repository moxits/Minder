$('#login-box-button').click(function(){
    var userName = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    $.ajax({
        url:"http://localhost:3000/users",
        type:"GET"
    })
    .done(function(json){
        var userList = json;
        for (var i=0;i<userList.length;i++){
                if(userList[i].email==userName&&userList[i].password==password){
                    console.log('Matched');
                }
                else{
                    alert("Incorrect Username or Password");
                }
            }
        })
    });