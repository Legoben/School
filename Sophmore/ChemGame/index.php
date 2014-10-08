<!DOCTYPE html>
<html>

<head>
    <title>Home - The Chemistry Game</title>
    <link href="css/main.css" rel="stylesheet" type="text/css">
</head>
<body>
<?php
//Error Reporting
if (isset($_GET['noname'])){
    echo '<span style="color:red;">Please enter a name and try again.</span>';
} elseif(isset($_GET['noteam'])){
    echo '<span style="color:red;">Please select a team and try again.</span>';
} elseif(isset($_GET['invalidteam'])){
    echo '<span style="color:red;">The team you selected is invalid, please try again.</span>';
} elseif(isset($_GET['loggedout'])){
    echo '<span style="color:red;">You have been logged out.</span>';
} elseif(isset($_GET['login'])){
    echo '<span style="color:red;">Please log in and try again.</span>';
}
?>
<div id="main-header"><a href='/'><span class="head-text">The Chemistry Game!</span></a></div>
    
<br><br><br><br><br><br><br><h1 style="text-align:center;">The Chemistry Game!</h1>

<?php 
session_start();

if (isset($_SESSION['name']) and $_SESSION['name'] != '' and isset($_SESSION['team'])){
    echo '<p style="text-align:center;">You are logged in as '.$_SESSION["name"].'<form method="POST" align="center" action="game.php"><button name="play">Play!</button><form></p>'; //User is logged in as ___
} else {
    echo '<p style="text-align:center;">Please enter your name:<form align="center" method="POST" action="setname.php"><input name="name" placeholder="Insert Name..."><br>Team 1<input type="radio" name="team" value="One"> Team 2<input type="radio" name="team" value="Two"><br><input type="submit" name="submit" value="Play"><form></p>'; //User is not logged in, have them sign in and pick a team
}


?>
</body>
</html>