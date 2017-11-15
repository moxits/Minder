var APIKEY = "AIzaSyAiWRcJLLw5vP500IIteJGdxm16rHhDu0E";

function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

$('.addFriend').click(function(){
  var $this = $(this);
  if ($this.text() === 'Accept Request'){
    $this.text('Accepted');
    $.ajax({
        url:"http://localhost:3000/users/acceptRequest/"+$this.val(),
        type: "POST",
    })
    .done(function(json){
        console.log(json);
    });
  }
});