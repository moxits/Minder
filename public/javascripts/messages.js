//this function can remove a array element.
Array.remove = function(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

//this variable represents the total number of popups can be displayed according to the viewport width
var total_popups = 0;

//arrays of popups ids
var popups = [];

//this is used to close a popup
function close_popup(id)
{
    for(var iii = 0; iii < popups.length; iii++)
    {
        if(id == popups[iii])
        {
            Array.remove(popups, iii);
            
            document.getElementById(id).remove();
        
            calculate_popups();
            
            return;
        }
    }   
}

//displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
function display_popups()
{
    var right = 220;
    
    var iii = 0;
    for(iii; iii < total_popups; iii++)
    {
        if(popups[iii] != undefined)
        {
            var element = document.getElementById(popups[iii]);
            element.style.right = right + "px";
            right = right + 320;
            element.style.display = "block";
        }
    }
    
    for(var jjj = iii; jjj < popups.length; jjj++)
    {
        var element = document.getElementById(popups[jjj]);
        element.style.display = "none";
    }
}

//creates markup for a new popup. Adds the id to popups array.
function register_popup(id, name)
{
    var todelete = $("#msg-container").children();
    for (var i=0;i<=todelete.length;i++)
    {
        console.log(todelete[i]);
        if (todelete[i]!=undefined)
        {
            var deleteID = todelete[i].getAttribute('id');
            close_popup(deleteID);
        }
    }
    for(var iii = 0; iii < popups.length; iii++)
    {   
        //already registered. Bring it to front.
        if(id == popups[iii])
        {
            Array.remove(popups, iii);
        
            popups.unshift(id);
            
            calculate_popups();
            
            
            return;
        }
    }           
    var element = '<div class="popup-box chat-popup" id="'+ id +'">';
    element = element + '<div class="popup-head">';
    element = element + '<div class="popup-head-left">'+ name +'</div>';
    element = element + '<div class="popup-head-right"><a href="javascript:close_popup(\''+ id +'\');">&#10005;</a></div>';
    element = element + '<div style="clear: both"></div></div><div class="popup-messages"><div class = "message-box"><ul class="msg-list"></ul></div><input type="text" class="chat-input"/></div></div>';

    var friendId = {
        id:id,
        
    }
    //document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;  
    document.getElementById("msg-container").innerHTML = document.getElementById("msg-container").innerHTML + element; 
    $.ajax({
        url:"http://localhost:3000/users/loadmessage",
        type: "POST",
        data:friendId,
    })
    .done(function(json){
        var division = $("#"+id)[0];
        for (i=0;i<json.length;i++){
            var message = $('<li/>').addClass('message').html(json[i].text);
            if (json[i].from === id)
            {
                message.addClass("received");
            }else{
                message.addClass("sent");
            }
            $(".msg-list",'.message-box',".popup-messages",division).append(message);
            messageContainer = $('.message-box',".popup-messages",division);
            messageContainer[0].scrollTop = messageContainer[0].scrollHeight;

        }
    });


    socket.on('chat message', function(msg){
        var message = $('<li/>').addClass('message').html(msg.text);
        var div = document.getElementById(id);
        if (msg.from===id)
        {
            console.log(id);
            message.addClass('received');
            $(".msg-list",'.message-box',".popup-messages",div).append(message);
            messageContainer = $('.message-box',".popup-messages",div);
            messageContainer[0].scrollTop = messageContainer[0].scrollHeight;
        }
      });

    $("#msg-container").on("keypress",".popup-messages",function(event){
        key = event.keyCode;
        if (key===13){
            var newMsg = {};
            text = $('.chat-input',this).val();
            newMsg.to = ($(this).parent().attr('id'));
            var message = $('<li/>').addClass('message sent').html(text);
            newMsg.text = text;
            newMsg.time = new Date($.now());
            if (newMsg.text!=""){
                $.ajax({
                    url:"http://localhost:3000/users/sendmessage",
                    data:newMsg,
                    type:"POST",
                })
                socket.emit('chat message', newMsg);
                var div = document.getElementById(id);
                console.log(message);
                $(".msg-list",'.message-box',this).append(message);
                var messageContainer = $('.message-box',this);
                messageContainer[0].scrollTop = messageContainer[0].scrollHeight;               
                $('.chat-input',this).val("");
            }
        }
    });

    popups.unshift(id);
            
    calculate_popups();
    
}






//calculate the total number of popups suitable and then populate the toatal_popups variable.
function calculate_popups()
{
    var width = window.innerWidth;
    if(width < 540)
    {
        total_popups = 0;
    }
    else
    {
        width = width - 200;
        //320 is width of a single popup box
        total_popups = parseInt(width/1000);
    }
    
    display_popups();
    
}


//recalculate when window is loaded and also when window is resized.
window.addEventListener("resize", calculate_popups);
window.addEventListener("load", calculate_popups);
