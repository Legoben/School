// Let us open a web socket
var ws = new WebSocket("ws://localhost:9008/ws");
ws.onopen = function () {
    console.info('In!')
    // Web Socket is connected, send data using send()
};


ws.onmessage = function (evt) {
    console.log(evt);
    json = JSON.parse(evt.data);
    
    console.log(json)
    
    if (json.event == 'nextslide'){
        console.log('here')
        Reveal.next();   
    } else if (json.event == 'prevslide'){
        Reveal.prev();   
    } else if(json.event == "sendmessage"){
        var m = document.getElementById('messages')
        m.innerHTML = '<b>user:</b> ' +json.chat + '<br>' + m.innerHTML
    }
};


function sendMessage(){
    if(document.getElementById('sendmessage').value == ''){
        return;   
    }
        ws.send('{"event":"sendmessage", "chat":"'+document.getElementById('sendmessage').value+'"}') 
        document.getElementById('sendmessage').value = '';
          
}

ws.onclose = function () {
    // websocket is closed.
    console.warn('WebSockets disconnected.')
};