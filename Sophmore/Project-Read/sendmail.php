<?php
    if (!isset($_POST['email']) or $_POST['email'] == ''){
        echo'<meta http-equiv="refresh" content="0;URL=/?email" />';
        die();
    }

    if (!isset($_POST['name']) or $_POST['name'] == ''){
        echo'<meta http-equiv="refresh" content="0;URL=/?name" />';
        die();
    }

    $to = $_POST['email'];
    $subject = "RE: Please Vote Against Bill F451";
    $message = "Dear ".$_POST['name'].":\n Thank you for your email, after careful consideration, I have decided to vote against Bill F451. Books are an essential part of growing our nation. Without books, we would be nowhere. \n Thanks again, Senator Hubert Hoag";
    $headers = "From:Hubert Hoag <hubert.hoag@helloben.co>";
    
    mail($to,$subject,$message,$headers);
    
    echo'<meta http-equiv="refresh" content="0;URL=/?sent" />';
?>