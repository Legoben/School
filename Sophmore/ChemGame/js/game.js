function getQuestion(){ 
    $.ajax({type: 'POST',url: 'getquestion.php',timeout: 30000, success:function(data){
        $('#questionholder').html(data)
    }});
}

function submitAnswer(){
    var useranswer = $('input[name=answer]:checked').val();
    $.ajax({type: 'GET',url: 'checkanswer.php',timeout: 30000,data:{'answer':useranswer}, success:function(data){
        console.log(data);
        $('#score').html(data);
    }});
    getQuestion();
}




getQuestion();