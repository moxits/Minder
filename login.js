$('#login-box-button').click(function(){
    var userName = $('input[name=username]');
    var password = $('input[name=password]');
    $.ajax({
        url:"http://localhost:3000/users",
        type:"GET"
    })
    .done(function(json){
        var userList = json;
        for (var i=0;i<userList.length;i++){
            console.log('works');
            if (userList[i].email==userName&&userlist[i].password==password){
                alert("SUCCESS");
            }
        }
    })
});