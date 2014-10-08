var OldName = '';

function updateName(){
    var name = $('#name').val();
    
    if (OldName == ''){
        var repname = '[Name]'
    } else {
        var repname = OldName;
    }
    
    document.getElementById('message').innerHTML = document.getElementById('message').innerHTML.replace(repname, name)
    OldName = name;
}