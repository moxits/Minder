
$('.addFriend').click(function(){
    var $this = $(this);
    
    if ($this.text() === 'Send Friend Request'){
        $this.text('Cancel Friend Request');
        $.ajax({
            url:"/users/addFriend/"+$this.val(),
            type: "POST",
        })
        .done(function(json){
            console.log(json);
        });
    }else{
        $this.text('Send Friend Request');
        $.ajax({
            url:"/users/deleteFriend/"+$this.val(),
            type:"DELETE",
        })
        .done(function(json){
            console.log(json);
        });         
    }
});     