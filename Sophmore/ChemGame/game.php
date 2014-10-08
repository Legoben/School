<?php
session_start();
//echo $_SESSION['name'];
//echo $_SESSION['team'];
if (!isset($_SESSION['name']) or $_SESSION['name'] == '' or !isset($_SESSION['team'])){
    echo '<meta http-equiv="refresh" content="0; url=index.php?login">';
    die();   
}
?>
<html>
<head>
    <title>Home - The Chemistry Game</title>
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <link href="css/game.css" rel="stylesheet" type="text/css">
</head>
<body>
    
    <div id="main-header"><a href='/'><span class="head-text">The Chemistry Game!</span></a> <span id="score-holder">Score: <span id="score"><?php echo $_SESSION['score'];?></span></span></div>
    
    <br><br><br><br><br><br><br>
    <center>
        <div id="questionholder">...</div>
    </center>
    
    <script>
    //Define things using PHP.
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script src="js/game.js"></script>
</body>
</html>