
$('.addFriend').click(function(){
    var $this = $(this);
    
    if ($this.text() === 'Add Friend'){
        $this.text('Remove friend');
        $.ajax({
            url:"http://localhost:3000/users/addFriend/"+$this.val(),
            type: "POST",
        })
        .done(function(json){
            console.log(json);
        });
    }else{
        $this.text('Add Friend');
        $.ajax({
            url:"http://localhost:3000/users/deleteFriend/"+$this.val(),
            type:"DELETE",
        })
        .done(function(json){
            console.log(json);
        });         
    }
});     