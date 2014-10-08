    $(document).ready(function() {
        $("#quest").mousemove(function(e) {       
            $('#quest-tooltip').css('left', e.pageX + 10).css('top', e.pageY + 10).css('display', 'block');
        });
        $("#quest").mouseout(function() { 
            $('#quest-tooltip').css('display', 'none');
        });
        
        
        $("#rain").mousemove(function(f) { 
            $('#rain-tooltip').css('left', f.pageX + 10).css('top', f.pageY + 10).css('display', 'block');
        });
        $("#rain").mouseout(function() { 
            $('#rain-tooltip').css('display', 'none');
        });

        
        $("#symbol").mousemove(function(r) { 
            $('#symbol-tooltip').css('left', r.pageX + 10).css('top', r.pageY + 10).css('display', 'block');
        });
        $("#symbol").mouseout(function() { 
            $('#symbol-tooltip').css('display', 'none');
        });

        
        $("#shakespeare").mousemove(function(s) { 
            $('#shakespeare-tooltip').css('left', s.pageX + 10).css('top', s.pageY + 10).css('display', 'block');
        });
        $("#shakespeare").mouseout(function() { 
            $('#shakespeare-tooltip').css('display', 'none');
        });
        
        
         $("#allusion").mousemove(function(a) { 
            $('#allusion-tooltip').css('left', a.pageX + 10).css('top', a.pageY + 10).css('display', 'block');
        });
        $("#allusion").mouseout(function() { 
            $('#allusion-tooltip').css('display', 'none');
        });

         $("#death").mousemove(function(d) { 
            $('#death-tooltip').css('left', d.pageX + 10).css('top', d.pageY + 10).css('display', 'block');
        });
        $("#death").mouseout(function() { 
            $('#death-tooltip').css('display', 'none');
        });
        
         $("#cryptic").mousemove(function(c) { 
            $('#cryptic-tooltip').css('left', c.pageX + 10).css('top', c.pageY + 10).css('display', 'block');
        });
        $("#cryptic").mouseout(function() { 
            $('#cryptic-tooltip').css('display', 'none');
        });
        
         $("#disagree").mousemove(function(c) { 
            $('#disagree-tooltip').css('left', c.pageX + 10).css('top', c.pageY + 10).css('display', 'block');
        });
        $("#disagree").mouseout(function() { 
            $('#disagree-tooltip').css('display', 'none');
        });
    });