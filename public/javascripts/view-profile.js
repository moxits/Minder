$.ajax({        
    url:'/users/getuser',
    type: 'GET'
}).done(function(json){
    user = json;
})
$(document).ready(function(){
    console.log(user);
    console.log(viewedUser);
});

   
