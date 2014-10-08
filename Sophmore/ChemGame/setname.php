<?php
//ToDo Validate
session_start();

function Clean($string){
    return $string;
}

//Check if user filled in name, set it as cookie
if (!isset($_POST['name'])){
    echo '<meta http-equiv="refresh" content="0; url=index.php?noname">';
    die();
}

//Check if user 
if($_POST['name'] == ""){
    $_SESSION['name'] = "";
    echo '<meta http-equiv="refresh" content="0; url=index.php?loggedout">';
    die();
} else {
    $_SESSION['name'] = Clean($_POST['name']);
    echo 'logged in as '.$_SESSION['name'];
}

if(!isset($_POST['team'])){
    echo '<meta http-equiv="refresh" content="0; url=index.php?noteam">';
    die();
}

if(false){ //Team is one two or three
    echo '<meta http-equiv="refresh" content="0; url=index.php?invalidteam">';
    die();
} else {
    $_SESSION['team'] = $_POST['team'];
}

$name = $_SESSION['name'];
$team = $_SESSION['team'];

include 'sqlconnect.php';
$query = "INSERT INTO Scores VALUES ('','$name', '$team', '0')";
mysql_query($query);

echo '<meta http-equiv="refresh" content="0; url=game.php">';

?>