<?php 
session_start();
if (!isset($_SESSION['score'])){
    $_SESSION['score'] = 0;   
}

$output = array();
$answer = (string)$_SESSION['answer'];
$output['answer'] = $answer;

if (!isset($_GET['answer'])){
    die('error'); //ToDo: Take away a point   
}

if($_SESSION['answerid'] == $_GET['answer']){
    //User is right
    $_SESSION['score'] += 1;
} else {
    //User is wrong
    $_SESSION['score'] -= 1;
}

$score = $_SESSION['score'];
$output['score'] = $score;

$name = $_SESSION['name'];

require 'sqlconnect.php';
$query = "UPDATE Scores SET score = '$score' WHERE name = '$name'";
mysql_query($query);

echo $score;

?>