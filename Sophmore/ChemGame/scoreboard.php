<?php 
//Require password
?>

<html>
<head>
    <title>Scoreboard</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/scoreboard.css">
    
</head>
    <div id="main-header"><a href='/'><span class="head-text">The Chemistry Game!</span></a><span id="time-holder">Time left: <span id="time">0</span>s</span></div>
    
    <br><br><br><br><br><br><br><center>
        <h1>Team <span id="teamname">...</span> is in the lead with <span id="points">...</span> points.</h1>
        <h2>Team <span id="2teamname">...</span> has <span id="2points">...</span> points</h2>
    </center>

    <span id="footer"><input type="number" id="timein"><button onclick="startTime();">Start</button><button onclick="stopTime();">Stop</button></span>
    
    
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script src="js/scoreboard.js"></script>
</html>