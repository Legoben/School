var tclass = {"grades":[], "cats":{}, "totals":{}};

$("#Courses-Grades > div.mid-right-blueCorner > div > div > div > div > div.top-right-blueCorner > div > div > div > div.StudentDetail > table > tbody > tr > td:nth-child(2) > table tr").each(function (i) {
    $(".percentHeading h4 span a", this).remove()
    var h = $(".percentHeading h4 span", this).text().replace("&nbsp;","").trim();
    
    var s1 = h.indexOf("|") + 1;
    var s2 = h.indexOf("/", s1);
    var s3 = h.indexOf(" ", s2)
    
    var gotten = parseInt(h.slice(s1,s2));
    var total = parseInt(h.slice(s2+1, s3));
    
    //console.log(gotten, total)
    
    //$(".percentHeading h4 span", this).remove() //ToDo: Workaround
    
    
    var t = $(".percentHeading h4", this).html();

    var t1 = t.indexOf("<span")
    var t2 =  t.indexOf("</span>",t1)
    var tsub = t.slice(t1, t2+"</span>".length)
    var t = t.replace(tsub, 0);

    var i1 = t.indexOf("%")
    var i2 = t.lastIndexOf(" ", i1)
    
    var name = t.slice(0,i2).trim();
    
    //console.log(t, name, i1, i2)
    
    tclass.totals[name] = [gotten, total, gotten/total];
})


$("#school_stugrade_activities > div > table.ntlp_table.sticky-enabled.sticky-table > thead > tr > th").each(function(col){
    if(col == 0 || col == 1 || col == 2){
        return   
    }
    
    var cat = {}
    
    cat.name = $(this).attr("title")
    
    
    //console.log()
    cat.weight = parseFloat("." + $("span", this).text().replace("%", ""));
    
    tclass.cats[col + ""] = cat;
    
})


$("#school_stugrade_activities > div > table.ntlp_table.sticky-enabled.sticky-table > tbody > tr").each(function () {
    var assng = {"g":{}}
    $("> td", this).each(function (col) {
        if (col == 0){
            assng.name = $(this).text();
            return;
        }
        
        if(col == 1 || col == 2){
            return   
        }
        
        var html = $(this).html();
        if (html == "") {
            return
        }
        
        var t = $("table > tbody > tr > td:nth-child(1)", this).text();
        if(t == ""){
            return
        }
        
        var score = parseFloat(t)
        var max = parseFloat($("table > tbody > tr > td:nth-child(3)", this).text())

        
        
        assng['g'][col + ""] = [score, max];
        
        
        
    })
    
    tclass.grades.push(assng);
})

//prompt("Copy to clipboard: Cmd+C, Enter", JSON.stringify(tclass));


var improvements = []
function check(){
    for(var i = 0; i < tclass.grades.length; i++){
        var ptotal = 0
        var t = tclass.grades[i]
        var name = t.name;
        for (var key in t.g){
            var got = t.g[key][0]    
            var total = t.g[key][1]
            var catname = tclass.cats[key].name
            var weight = tclass.cats[key].weight
            var catgot = tclass.totals[catname][0]
            var cattotal = tclass.totals[catname][1]
            var catpercent = tclass.totals[catname][2]
            //console.log(got, total, catname, weight, catgot, cattotal)
            
            
            var n = ((total - got) + catgot); //Find out the total in the category if a 100 was scored
            var p = (catgot / cattotal) * weight * 100; //Find out the current number of points being given by that category
            var r = ((n / cattotal) * weight * 100) - p; //Find out the number of points that would be given if a 100 was scored.
            
            
            //var r = Math.abs(((n + catpercent) * weight) * 100);
            
            //console.log(name, n, p, r);
            
            ptotal += r;
        }
        
        
        improvements.push({name:name, up:ptotal})
    }
    
    improvements.sort(function(a,b) {
          if (a.up > b.up)
             return -1;
          if (a.up < b.up)
            return 1;
          return 0;
    });
    
}


function displayResults(results){
    
    //$('<link/>', {rel: 'stylesheet', type: 'text/css', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'}).appendTo('head');
    //$.getScript("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js")
    //$.getScript("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js")
    
    //$('#Courses-Grades > div.mid-right-blueCorner > div > div > div > div > div.ActivitiesPanel > div.GradesTabCenter > div:nth-child(1) > ul > li:nth-child(1) > h2').append('&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#graderankresults">View Most Impacting Grades</button>');
    
    var insert = "";
    
    for(var i = 0; i < results.length; i++){
        insert+= "<tr><td>"+results[i].name+"</td><td>"+results[i].up.toFixed(4)+" points</td></tr>";   
    }
    
    
    $(".ActivitiesPanel").append('<a name="imp"></a><table style="text-align:center;" width="100%" class="table" align="center" border="1" cellpadding="5" id="improvementtable" > <tr> <th> Assignment Name </th> <th> Improvement to grade if it were a 100% </th> </tr> '+insert+' </table>')
    
    $("#Courses-Grades > div.mid-right-blueCorner > div > div > div > div > div.ActivitiesPanel > div.GradesTabCenter > div:nth-child(1) > ul > li:nth-child(1) > h2").append(" (Scroll down to see possible improvements)")
}





//var total = 0; for(var i = 0; i < improvements.length; i++){total += improvements[i].up} console.log(total); //Test code

check();
displayResults(improvements);