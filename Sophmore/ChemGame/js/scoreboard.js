var trequest = false;
var timeleft = 0;

function widopoll(){
if (window.trequest === true){
    setTimeout(function(){
        console.log('Hi');
    },1000)
    dopoll();
} else {
    console.log("Countdown Stopped.");
    return null;
    }    
}

function dopoll(){
    $.ajax({ url: "getteamscores.php", success: function(data){
        if(timeleft == 0){
            trequest = false;   
        } else {
            timeleft = timeleft - 1;
            $('#time').html(timeleft);
            console.log(timeleft);
        }
        
        var teams = $.parseJSON(data);
        console.log(teams['Two'])
        
        if(teams['One'] > teams['Two']){
            $('#teamname').text('One');
            $('#points').text(teams['One']);
            $('#2teamname').text('Two');
            $('#2points').text(teams['Two']);
        } else {
            $('#2teamname').text('One');
            $('#2points').text(teams['One']);
            $('#teamname').text('Two');
            $('#points').text(teams['Two']);
        }
        
    }, dataType: "html", complete:widopoll, timeout: 7000}); 
}
           
function startTime(){
    var newtime = $('#timein').val();
    if(newtime != ''){
        timeleft = Number(newtime);
        $('#timein').val('');
    }
    trequest = true;
    
    dopoll();
}

function stopTime(){
    trequest = false;   
}