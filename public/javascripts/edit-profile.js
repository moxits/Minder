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
 


var updateUser;
$('#continue-button').click(function(){
    var tagArray = [];
    $( ".tag" ).each(function() {
        var text = $(this).text();
        var topush = text.substring(0,text.length-1)
        tagArray.push($(this).text());
      });             

    emailtosearch = $("input[name=email2").val();
    updateUser = {
        email:emailtosearch,
        bio:$("#bio").val(),
        tags:tagArray,
        school:$('input[name=education').val(),
        password:$('input[name=password]').val(),
    }
    $.ajax({
        url:"/users",
        data:updateUser,
        type:"PATCH",
    })
    .done(function(json){
        window.location.replace("/users/profile-page");
    })
});