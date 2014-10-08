function getCookie(c_name) //Via W3Schools
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}

window.mobilecheck = function() { //Via detectmobilebrowsers.com
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
return check; }

ismobile = window.mobilecheck();

if(window.mobilecheck()){
    console.log('Mobile Detected!');
    document.body.innerHTML = '';
    $.ajax({ url: "links.html", success: function(data){
        document.write(data); 
    }, dataType: "html", timeout: 700000});
    throw '';
} else {
    console.log('Not on Mobile.');
}



var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var player;


      function onYouTubeIframeAPIReady() {
        player = new YT.Player('ytplayer', {
          height: '531',
          width: '350',
          videoId: 'aDjG_6dXjy8',
          playerVars: {'controls':0, 'showinfo': 0, 'modestbranding': 1, 'rel': 0, 'disablekb': 1, 'fs': 0, 'enablejsapi': 1},
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
    
      function animate(){
          setTimeout(function(){
            console.log('Applying Annotation')
            $('#annotbox').css("display","block");
        },12000 );
      }

      function onPlayerReady(event) {
        event.target.playVideo();
        var mutedcookie=getCookie("isitmuted");
        if (mutedcookie!=null && mutedcookie!=""){
            if (mutedcookie == 'true'){
                muteVideo();   
            }
        }else{
            document.cookie= "isitmuted=false";
        }
        setTimeout(function(){
            animate();
            console.log('Loaded!')
        },550 );
        }

    var music = new Audio('music.mp3?');
      function onPlayerStateChange(event) {        
        if(event.data === 0) {          
            //End of video
            console.log("Video Ended!")
            $('#animation').css("background-image","url('s.png')");
            $('#yt-wrapper').css("display","none");
            document.getElementById('statusbutton').innerHTML = 'Restart';
            ispaused = null
            music.play();
            music.volume = 0.3;
            imusic = true;
            if (mute == true){
                music.pause();
            }
            setTimeout(function(){
                mute = false;
                muteVideo();
                document.cookie = "isitmuted=false";
            }, 20000)
        }
      }


    var ispaused = false
      function stopVideo() {
        if (ispaused == true){
            player.playVideo();
            document.getElementById('statusbutton').innerHTML = 'Pause';
            ispaused = false
        } else if (ispaused == false){    
            player.pauseVideo();
            document.getElementById('statusbutton').innerHTML = 'Play';
            ispaused = true
        } else if (ispaused == null) {
            //Restart video + animation. Set ispaused to false
            $('#animation').css("background-image","url('none.png')");
            $('#yt-wrapper').css("display","block");
            player.playVideo();
            document.getElementById('statusbutton').innerHTML = 'Pause';
            ispaused = false;
            music.pause();
            imusic = false;
        }
      }

    var imusic = false;
    var mute = false;
      function muteVideo() {
        if (mute == true){
            player.unMute();
            document.getElementById('mutebutton').innerHTML = 'Mute';
            mute = false
            document.cookie= "isitmuted=false";
            if(imusic){
                music.play()  
            }
        }  else if (mute == false){    
            player.mute();
            document.getElementById('mutebutton').innerHTML = 'Unmute';
            mute = true
            document.cookie= "isitmuted=true";
            if(imusic){
                music.pause()  
            }
        }
      }