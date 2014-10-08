<!DOCTYPE html>
<html>
<head>
    <title>Oppose Bill F451!</title>
    <link href="main.css" type="text/css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <meta name="viewport" content="width=device-width, user-scalable=no">
</head>

<body>

    
        <div id="vid-container">
            <center><iframe width="720" height="480" id="ytplayer" type="text/html"
  src="http://www.youtube.com/embed/hs4JIlS2LCg?autoplay=1&hd=1&autohide=1&rel=0&loop=1" frameborder="0"></iframe></center>
        </div>
        <br>
        <h1 align="center" name="title">Reading is Great!</h1>
        <h2 align="center">Let's keep it around.</h2>
        <p id="explain">Reading is an important part of society. It keeps the citizens informed and engaged, and helps keep them active and informed on current events. Politicians are trying to take away our right to read. Not only is this against the first amendment, but this will sink our country into the ground. Below is a form to contact your local senator, Hubert Hoag. Please fill out your name and email and urge him to vote against Bill F451</p>
        <form align="center" id="form" name="form" method="POST" action="sendmail.php">
                <center><?php
    if (isset($_GET['email'])){
        echo '<span style="color:red;">Please input an email!</span>';
    }
    
    if (isset($_GET['name'])){
        echo '<span style="color:red;">Please input a name!</span>';
    }
    ?></center>
        <p>Your Name: <br> <input id="name" name="name" placeholder="Name ..." onchange="updateName()"></p>
        <p>Your Email: <br> <input id="email" name="email" placeholder="Email ..."></p>
        <p>Your Message: <br> 
<textarea cols="60" rows="7" id="message" name="message">Dear Senator H. Hoag:
    I am sending you this email to tell you to vote against Bill F451. Not only does this bill go against the First Amendment, but it is taking away one of humanity's greatest resources, the book. Without the book, our society will fall back into the stone ages. So, I am urging you to reconsider voting opposed of Bill 451.
    Sincerely, [Name]</textarea></p>
        <p id="button">
            <?php
            if (isset($_GET['sent'])){
                echo 'Email Sent!';
            } else {
                echo '<input type="submit" value="Contact!" id="contact">';
            }
            ?>
        </p>
        </form>
    <br>
    <script src="js/jquery.js"></script>
    <script src="js/main.js"></script>
</body>
</html>