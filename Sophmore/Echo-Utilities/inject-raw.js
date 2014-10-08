/* 
MADE BY BEN STOBAUGH - Ben@BenS.li

THIS EXTENSION IS NOT AFFILIATED OR ENDORSED BY NEWTECHNETWORK OR KNOWLEGEWORKS
*/


$('.panel-feature').remove(); //Hide that in-the-way featured panel
$('body').append($('#uid'))

function setCookie(cname, cvalue, exdays) { //Generic set cookie function
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) { //Generc get cookie function
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


if(getCookie('classes') != ''){ //If we've previously gotten the classes
    $('.item-list .item-block.course-block').each(function(){ //Loop through classes
        var tidd = $('div.title-row > h2 > a', this);
        if($(this).hasClass('term-header')){
            return; 
        }
        var tid = tidd.attr('href').replace('?q=ntlp/courses/home/',''); //Get ID
        $(this).attr('id',tid) //Set ID as id on parent
    });
    
    var cl = $.parseJSON(getCookie('classes')); //Get the list of classes and their periods 
    var array = [] //Setup Temp array
    for(a in cl){
        array.push([a,cl[a]]) //Put class ID and it's period in array
    }
    array.sort(function(a,b){return a[1] - b[1]}); //Sort the classes.
    array.reverse() //Reverse it.
    
    for (var i = 0; i < array.length; i++) {
        $('.item-list').prepend($('#'+array[i][0])); //Not spit out the classes in the right order.
    }
}



var arry = getCookie('hidden').split(","); //Get the list of classes that the user have hidden 
for (var i = 0; i < arry.length; i++) { 
    arry[i] = parseInt(arry[i]); //Turn the sting numbers into int numbers. 
}

function updateCookie() { //Update the hidden class list we have on file
    var totalstr = ''
    for (var i = 0; i < arry.length; i++) {
        totalstr += arry[i] + ','; //Turn array into string
    }
    totalstr = totalstr.substring(0, totalstr.length - 1); //Remove trailing comma
    setCookie('hidden', totalstr, 90); //Set the cookie
}

function jc(n) {
    //Called for classes that are hidden by default - just hides them. 
    $('div.panel-body.item-list > div:nth-child(' + n + ') > div:nth-child(4)').hide();
    $('div.panel-body.item-list > div:nth-child(' + n + ') > div.title-row > ul').hide();
    $('div.panel-body.item-list > div:nth-child(' + n + ') > div.title-row > div').hide();
}

function collapse(n) { //Collapse clicked on class
    $('div.panel-body.item-list > div:nth-child(' + n + ') > div:nth-child(4)').slideToggle();
    $('div.panel-body.item-list > div:nth-child(' + n + ') > div.title-row > ul').slideToggle();
    $('div.panel-body.item-list > div:nth-child(' + n + ') > div.title-row > div').slideToggle(); //Hide the panel
    var i = $.inArray(n, arry) //If the item is already in the array
    if ((i) != -1) { 
        arry.splice(i, 1); //It it is in the array, take it out
    } else {
        arry.push(n); //If it is not in the array, put it in
    }
    updateCookie(); //Update the cookie
}


$('.btn.btn-xs.btn-blue.title-dd.dropdown-toggle').each(function (num) { //For each class
    $(this).attr('onclick', 'collapse(' + (num + 1) + ')'); //Add the onclick function
    $('div.panel.panel-default.home-courses > div.panel-body.item-list > div:nth-child(' + (num + 1) + ') > span > ul').remove(); //Remove the drop-dowm, as it is annoying.
    if ($.inArray((num + 1), arry) != -1) { //If the element should be hidden..
        jc(num + 1) //..Hide it.
    }
});

function openall() {
    $('.btn.btn-xs.btn-blue.title-dd.dropdown-toggle').each(function (num) { //For each class
        $('div.panel-body.item-list > div:nth-child(' + (num + 1) + ') > div:nth-child(4)').slideDown();
        $('div.panel-body.item-list > div:nth-child(' + (num + 1) + ') > div.title-row > ul').slideDown();
        $('div.panel-body.item-list > div:nth-child(' + (num + 1) + ') > div.title-row > div').slideDown(); //Open the class
        var i = $.inArray(num + 1, arry)
        if ((i) != -1) { //If the current class is in the array
            arry.splice(i, 1); //Take it out.
        }

    });
    updateCookie(); //Update
}

function collapseall() {
    $('.btn.btn-xs.btn-blue.title-dd.dropdown-toggle').each(function (num) { //Each class
        $('div.panel-body.item-list > div:nth-child(' + (num + 1) + ') > div:nth-child(4)').slideUp();
        $('div.panel-body.item-list > div:nth-child(' + (num + 1) + ') > div.title-row > ul').slideUp();
        $('div.panel-body.item-list > div:nth-child(' + (num + 1) + ') > div.title-row > div').slideUp(); //Hide the class
        var i = $.inArray(num + 1, arry) 
        if ((i) == -1) { //If this class is not in the array
            arry.push(num + 1); //Put it in
        }

    });
    updateCookie(); //Update
}

$('#content > div > div.col-sm-8 > div.panel.panel-default.home-courses > div.panel-heading > small').append(' <a href="#" onclick="openall(); return false;">Open All</a> <a href="#" onclick="collapseall(); return false;">Collapse All</a>') //Add the controls for the collapsing classes



var el = document.createElement('div'); //Create a fake div

$.ajax({
    url: "?q=ntlp/grades/student_snapshot/", //Get user's grades
    success: function (data) {
        el.innerHTML = data; //Put the response in the fake div
        doThing(); //Call function
    },
});

$('.col-sm-4').prepend('<div id="grades-tab" class="panel"></div><div id="groups-tab" class="panel"></div>'); //Create grades and groups panels
$('#grades-tab').html('<div class="panel-heading">Grades</div><div class="panel-body loading" id="grades-content"></div>'); //Put grades title in grades panel

var g = ''; //Tmp string

function doThing() { //Function called fron grades ajax - Extracts and formats grades
    var classes = {} //Object used to store order of user classes
    
    $('#course_187043183 div table tbody tr', el).each(function () { //For each class
        
        var grade = $('td.active', this).text().replace('__ (', '').replace(')', ''); //Get the grade
        var mclass = $('td:nth-child(1)', this).text(); //Get the class name
        var href = $('td:nth-child(1) a', this).attr('href'); //Get the class link
        var id = href.replace('/?q=ntlp/courses/grade/',''); //Get the class id
        var period = parseInt($('td:nth-child(3)', this).text()) //Get the class period
        
        classes[id] = period; //Store the period in the object
        
        if (parseInt(grade.replace('%', '')) < 70){ //If you are failng the class
            g += '<label class="progress-label">' + mclass + '</label><div class="progress progress-sm"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + grade.replace('%', '') + '" aria-valuemin="0" aria-valuemax="100" style="width:' + grade + ';background-color:#FF3300" ><span>' + grade + '</span></div></div>'; //Display grades (red)
        } else {
            g += '<label class="progress-label">' + mclass + '</label><div class="progress progress-sm"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="' + grade.replace('%', '') + '" aria-valuemin="0" aria-valuemax="100" style="width:' + grade + '"><span>' + grade + '</span></div></div>'; //Display grades (regular)
        }
});
    
    $('#grades-content').attr('class','panel-body'); //Add the class of panel body
    $('#grades-content').html(g); //Add the grades
    
    setCookie('classes',JSON.stringify(classes), 90) //Locally store the user's classes
}

//var l = '<label class="progress-label"></label><div class="progress progress-sm"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" style="width:33%"><span>29%</span></div></div>';


//$('#content > div > div.col-sm-8.col-md-9 > div.row > div:nth-child(3)').remove(); //Remove NTN Ad
//$('#content > div > div.col-sm-8.col-md-9 > div.row > div:nth-child(3)').remove(); //Remove KnowlegeWorks Ad

$('body > header > div > div > ul.nav.header-nav.main.list-inline.col-xs-8 > li.brand > a').attr('href', '/'); //Set the home link to / instead of ?=home

/*$('#content > div > div.col-sm-8 > div.red> div:nth-child(2) > div > div > a').remove(); //Remove the help buttons
$('#content > div > div.col-sm-8 > div.red > div:nth-child(2) > div > div').append('<a href="mailto:Ben@beltonnewtech.org" target="_blank" class="btn btn-red btn-sm">Ask Ben <i class="icon-arrow-up-right5"></i></a>') //Add my email.
$('#content > div > div.col-sm-8 > div.red > div:nth-child(2) > div > div > p').html('<a href="http://echosupport.newtechnetwork.org/home" target="_blank">Visit the Help Center</a> or you could shoot Ben an email and he\'d be happy to help.') //Change the text*/
$('#content > div.row > div.col-sm-8 > div.panel.panel-default.red.teaser').hide()
$('.item-block .title-row .block-title a').css('color','black')//.css('font-weight','700');
//$('.item-block .block-title a').css('font-size','32px')



var groups;
$.ajax({
    url: "?q=ntlp/groups/my", //Get the groups
    success: function (data) {
        groups = $('.ntlp_table', data);  //Extract the groups from the data
        doThing1() //Call groups function
    },
}); 

$('#groups-tab').html('<div class="panel-heading">Groups</div><div class="panel-body"><table class="sub-list table" id="groups-table"><tbody><tr class="loading"></tr></tbody></table></div>') //Put stuff in groups tab

function updateGroup(ele){ //When a user clicks to go to a group, let us know so we can take the notifaction away.
    var id = $(ele).attr('href').replace('/?q=ntlp/groups/home/',''); //Get the id
    var postsnum = parseInt($(ele).attr('value')); //Get the current posts
    posts[id] = postsnum; //Update the posts object
    setCookie('posts',JSON.stringify(posts), 90); //Store the new post count 
    $(ele).attr('style', 'background-color:transparent;') //Change the color of the group to normal
}

    
function clearAll(){ //Clears all notifacations
    $('tr','#groups-table tbody').each(function(){ //For each group
        var val = $('th a', this).attr('value'); //Get post count
        var id = $('th a',this).attr('href').replace('/?q=ntlp/groups/home/',''); //Get ID
        //console.log(id,val,this)
        posts[id] = val; //Uodate post count
        if($(this).attr('style') == 'background-color:lightgray;'){
            $(this).attr('style', 'background-color:transparent;') //If it previously had a BG color, make it not.
        }
    });
    setCookie('posts',JSON.stringify(posts), 90); //Store the updated post count
    $('#clearnotif').remove(); //Remove the clear-notifactions text.
}


var notifset = false; //We haven't set the clear all notifactions button yet

function getPosts(url, e){ //Get number of posts from a group and then display the group.
$.ajax({
    url: url, //Get the posts
    success: function(data) {
        var id = e.attr('href').replace('/?q=ntlp/groups/home/',''); //Group ID
        var postst = $('.Activities li:nth-child(2) span', data).text(); //Get the posts container
        var postsnum = parseInt(postst.replace('&nbsp;&nbsp;Posts', '')) //Get the posts and parse them as an int
        
        if (posts[id] == undefined){ //If we haven't set the posts before
            posts[id] = postsnum; //Set it.
            setCookie('posts',JSON.stringify(posts), 90); //Set the cookie to update the post count
            $('tbody','#groups-tab').append('<tr><th><a value="'+postsnum+'" href="'+e.attr('href')+'">'+e.text()+' ('+postst+')</a></th></tr>') //Post the posts
        } else { //If we have set the posts before
            if(posts[id] < postsnum){ //If there are more posts than we have on record
                if (notifset == false){ //If we have not put the 'clear notifactions' button
                    $('#groups-tab .panel-heading').append('<small id="clearnotif" class="pull-right all"><a href="#" onclick="clearAll(); return false;">Clear All Notifactions</a></small>'); //Put it
                    notifset = true; //Let us know so we won't do it again
                }
                
                $('tbody','#groups-tab').append('<tr style="background-color:lightgray;"><th><a value="'+postsnum+'" onclick="updateGroup(this)" href="'+e.attr('href')+'">'+e.text()+' ('+postst+')</a></th></tr>') //Post the groups with the notifaction
                
            } else { //If it is the same as we have on record
                $('tbody','#groups-tab').append('<tr><th><a value="'+postsnum+'" href="'+e.attr('href')+'">'+e.text()+' ('+postst+')</a></th></tr>') //Post the group
            }
        }
        
        $('tr.loading','#groups-tab').remove() //Remove the loading icon
        //$('tbody','#groups-tab').append('<tr><th><a href="'+e.attr('href')+'">'+e.text()+' ('+postst+')</a></th></tr>')
    },
});

}


if (getCookie('posts') == ''){  //If we have not created the posts cookie before
        setCookie('posts', '{}', 90); //Make it an empty object
}

var posts = $.parseJSON(getCookie('posts')); //Get the post count object from cookie.


function doThing1(){ //Called when we get the group page
    $('tr',groups).each(function(){ //Each group
        var e = $('td.active > div > a', this); ///Get the groups cell
        var link = e.attr('href'); //Get the URL from that 
        if (link == undefined){ //Protection
            return;
        }
        getPosts(link, e); //Get the post count from group
    });
}

$('.col-sm-4').append('<div class="panel" id="sat-panel"><div class="panel-heading">SAT Question Of The Day</div><div class="panel-body"></div></div>'); //Add the SAT Panel


function parseRSS(url, callback) { //Gets an RSS/XML Feed from a URL, send it to a function as JSON
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {
      callback(data.responseData.feed);
    }
  });
}

function xmlcallback(d){ //Callback function for SAT XML 
    $('#sat-panel .panel-body').html(d.entries[0].content);
    $('a','#sat-panel .panel-body').attr('target','_blank');
    //$('#sat-panel .panel-body p:nth-child(2)').remove(); //pls
    $('#sat-panel .panel-body p:nth-child(1)').remove(); 
    $('#sat-panel .panel-body p').attr('style','margin-top:0; font-size:14px;');
}

parseRSS('https://sat.collegeboard.org/practice/sat-question-of-the-day-rss',xmlcallback) //Call ParseRSS

$('.col-sm-4').append('<div class="panel" id="settings-panel"><div class="panel-heading">Echo Utilities Settings</div><div class="panel-body"></div></div>') //Create settings panel
$('#settings-panel .panel-body').html('<br><span style="text-align:center;"><a href="#" onclick="collapseallp(); return false;">Collapse All Panels </a>|<a href="#" onclick="openallp(); return false;">Open All Panels</a></span><br><br>Reorder Panels:<ul id="reorder-panels"></ul>') //Add Collapse All + Open All Options

$.ajax({url:'http://files.helloben.co/echo/announcement.php',success:function(data){$('#announcement').html(data.replace('\\',''));$('#announcement').removeClass('loading');}}); //Add Announcement. Get from my website.



$('.col-sm-4 .panel').each(function(num){
    $('.panel-body', this).attr('style','padding-top:0px;')
    $(this).addClass('panel_'+(num+1)); //Give all of the panels a number class so we can move them around.
});

if(getCookie('panel-order') == ''){
    var tmpobj = {};
    for(var i = 0; i < $('.col-sm-4 .panel').size(); i++){
        tmpobj[i+1] = i+1;   
    }
    setCookie('panel-order',JSON.stringify(tmpobj),90);
}

var panelorder = $.parseJSON(getCookie('panel-order'))

if(Object.keys(panelorder).length != $('.col-sm-4 .panel').size()){
    console.log('here',Object.keys(panelorder).length ,$('.col-sm-4 .panel').size())
    for(var i = 0; i < $('.col-sm-4 .panel').size(); i++){
        panelorder[i+1] = i+1;   
    }
    
    setCookie('panel-order',JSON.stringify(panelorder),90);
}

for(var i = 0; i < $('.col-sm-4 .panel').size(); i++){
    var tnum = panelorder[i+1]; 
    var tp = '.panel_'+tnum
    var str = $('.panel-heading', tp).html() 
    var s = str.search('<small'); //Select small tag
    var e = str.search('</small>', s);
    if(e != -1){
        var sub = str.substring(s,e+'</small>'.length) //Get rid of small tag and text
    } else {
        var sub = '';
    }
    //ToDo: Do the same thing with <i> tag
    
    var text = $('.panel-heading', tp).html().replace(sub,'') //Get panel title
    
    $('#reorder-panels').append('<li style="list-style:none;cursor:pointer;" value="'+tnum+'"> '+text+'</li>');
    $(".panel_"+tnum).detach().appendTo('.col-sm-4');
    //ToDo: Order panels in list and sidebar
}

$('#reorder-panels').sortable();


//Other stuff

$('#settings-panel .panel-body').append('<center><button onclick="savesettings()">Save</button><button onclick="resetsettings()" style="margin-left:5px;">Reset Settings</button></center>');

function savesettings(){
    $('#reorder-panels li').each(function(num){
        //console.log($(this).attr('value'))
        panelorder[num+1] = $(this).attr('value');
    });
   //console.log(panelorder);
    setCookie('panel-order',JSON.stringify(panelorder),90); 
    
    document.location.reload();
}

function resetsettings(){
    openallp();
    var tmpobj = {};
    for(var i = 0; i < $('.col-sm-4 .panel').size(); i++){
        tmpobj[i+1] = i+1;   
    }
    setCookie('panel-order',JSON.stringify(tmpobj),90);
    document.location.reload();
}

if(getCookie('panelh') == ''){
    setCookie('panelh','[]',90) //If we have not been here before, set panels hidden to empty array
}

var panelarry = $.parseJSON(getCookie('panelh')); //Get the list of hidden panels

$('.col-sm-4 .panel').each(function(n){ //For each panel
    var str = $('.panel-heading', this).html() 
    var s = str.search('<small'); //Select small tag
    var e = str.search('</small>', s)  
    if(e != -1){
        var sub = str.substring(s,e+'</small>'.length) //Get rid of small tag and text
    } else {
        var sub = '';
    }
    var text = $('.panel-heading', this).html().replace(sub,'') //Get panel title
    
    $('.panel-heading', this).html($('.panel-heading',this).html().replace(text.trim(), '<span title="Collapse/Open Panel" style="cursor:pointer;" onclick="collpanel('+(n+1)+')">'+text+'</span>')) //Replace title with onclick title inside of Span
    var i = $.inArray(n + 1, panelarry); //If panel # in panelarray
    if ((i) != -1) {
        $('.panel-body', this).hide() //Hide it
        //$('.tab-content',this).hide()
        $('ul.list-group',this).hide();
    }
});

function collpanel(n){ //Collapse panel with number n
    $('.col-sm-4 .panel:nth-child('+n+') .panel-body').slideToggle(); //Hide Panel contents
    $('.col-sm-4 .panel:nth-child('+n+') ul.list-group').slideToggle();
    //$('.col-sm-4 .panel:nth-child('+n+') .tab-content').slideToggle();
    
    //console.log('Hi!')
    var i = $.inArray(n, panelarry) //If # is in array
    if ((i) != -1) { 
        panelarry.splice(i, 1); //It it is in, take it out
    } else {
        panelarry.push(n); //If not in, put it in
    }
    setCookie('panelh',JSON.stringify(panelarry), 90); //And save it
}

function openallp() { //Open all panels
    $('.col-sm-4 .panel').each(function (num) {
        $('.panel-body',this).slideDown();
        $('ul',this).slideDown();
        var i = $.inArray(num + 1, panelarry)
        if ((i) != -1) {
            panelarry.splice(i, 1); //Take out of array if in already
        }

    });
    setCookie('panelh',JSON.stringify(panelarry), 90);
}

function collapseallp() { //Close all panels
    $('.col-sm-4 .panel').each(function (num) {
        if($(this).attr('id') == 'settings-panel'){
            return; 
        }
        $('.panel-body',this).slideUp();
        $('ul',this).slideUp();
        var i = $.inArray(num + 1, panelarry)
        if ((i) == -1) {
            panelarry.push(num + 1); //Put in array if not in already
        }

    });
    setCookie('panelh',JSON.stringify(panelarry), 90);
}


$('body > footer > div p').append(' | <a target="_blank" href="https://chrome.google.com/webstore/support/dgilonbbnkbigofadehklebgndhkojof?hl=en&gl=US#bug">Echo Utilites Support</a>')



function rickastley(){
    alert('YOU\'VE DONE IT!')
    $('.block-title a').text('Rick Astley Returns!');
    $('body').css('background-image','url("http://2.bp.blogspot.com/-baqmxAt8YHg/UMRuNx6uNdI/AAAAAAAAD1s/TzmvfnYyP8E/s1600/rick-astely.gif")');
    $('body').append('<iframe style="display:none;" width="640" height="360" src="//www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&loop=1&playlist=dQw4w9WgXcQ" frameborder="0" allowfullscreen=""></iframe>');  
}

var easter_egg = new Konami(rickastley); //Ba ba ba ba ba dum dum dum.
