<?php
include 'sqlconnect.php';

$query="SELECT * FROM Scores";
$result=mysql_query($query);
$num=mysql_numrows($result);
$i = 0;

$teams['One'] = 0;
$teams['Two'] = 0;
while ($i < $num){
    $score=mysql_result($result,$i,"score");
    $name=mysql_result($result,$i,"name");
    $team=mysql_result($result,$i,"team");
    
    if($team == 'One'){
        $teams['One'] += $score;
    } elseif ($team == 'Two'){
        $teams['Two'] += $score;
    }
    
    $i=$i+1;
}

echo json_encode($teams);
sleep(1);
?>