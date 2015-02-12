var c = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
c.src = chrome.extension.getURL('konami.js');
//c.onload = function() {
//    this.parentNode.removeChild(this);
//};

(document.head||document.documentElement).appendChild(c);

var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('inject-raw.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};

(document.head||document.documentElement).appendChild(s);
