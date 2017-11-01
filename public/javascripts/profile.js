function addTags(){
    var tagList = document.getElementById('tag-list');
    var tag = document.getElementById("tag-textbox").value;
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(tag));
    tagList.appendChild(entry);
    document.getElementById('tag-textbox').value = '';
}
 
    setTimeout(function(){
var video = document.querySelector("#videoElement");
 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}
 
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}
function videoError(e) {
    // do something
}
},1000);

function takePic(){
        var video = document.getElementById("videoElement");
        var canvas = document.getElementById("profile-image");
        canvas.getContext("2d").drawImage(video,0,0,150,150);
        var img = canvas.toDataURL("image/png");
        video.style.display = "none";
        canvas.style.display="inline";
}