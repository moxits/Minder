function addTags(){
    var tagList = $('#tag-list');
    var tag = $("#tag-textbox").val();
    var entire = $('<div>')
    var entry = $('<li>').addClass('tag').text(tag);
    entry.innerHTML = (tag);
    var deleteBtn = $('<span>').addClass('tag-delete').text('X');
    entire.append(entry);
    entire.append(deleteBtn);
    tagList.append(entire);
    document.getElementById('tag-textbox').value = '';
}
$('#tag-list').on('click', '.tag-delete', function() {
    $(this).parent().remove();
  });
 
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