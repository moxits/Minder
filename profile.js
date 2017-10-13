function addTags(){
    var tagList = document.getElementById('tag-list');
    var tag = document.getElementById("tag-textbox").value;
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(tag));
    tagList.appendChild(entry);
    document.getElementById('tag-textbox').value = '';
}
