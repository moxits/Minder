var input = document.querySelector("#chat-input");
var container = document.querySelector(".message-container");

input.addEventListener("keypress",function(event){
    key = event.keyCode;
    if (key===13){
        var message = document.createElement("p")
        message.innerHTML = input.value;
        container.appendChild(message);     
        input.value="";
    }
});

container.scrollTop = container.scrollHeight;