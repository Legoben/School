<?php
session_start();

function array_random_assoc($arr, $num = 1) {
    $keys = array_keys($arr);
    shuffle($keys);
    
    $r = array();
    for ($i = 0; $i < $num; $i  ) {
        $r[$keys[$i]] = $arr[$keys[$i]];
    }
    return $r;
}

function getAnswers($number,$min,$max){
    $min = 1;
    $max = 10.5;
    $c1 = rand($min*10, $max*10) / 10; //Number to + or - by
    $c2 = rand($min*10, $max*10) / 10; //Number to + or - by
    $m1 = rand(0,1); //Plus or minus
    $m2 = rand(0,1); //Plus or minus
    
    if($m1 == 0){
        if($c1 > $number){
            $choice1 = $number + $c1;
        } else {
            $choice1 = $number - $c1;
        }
    } else {
        $choice1 = $number + $c1;
    } //Randomly generate answers
    
    if($m2 == 0){
        if($c2 > $number){
            $choice2 = $number + $c2;
        } else {
            $choice2 = $number - $c2;
        }
    } else {
        $choice2 = $number + $c2;
    } //Randomly generate answers
    

    
    return array($choice1, $choice2);
}

function formatHTML($question,$rightanswer,$answer1,$answer2){
    $answers = array($rightanswer,$answer1,$answer2);
    shuffle($answers);
    $html = '';
    $html .= "<h2>$question</h2>";
    $html .= "<span>";
    $c = 0;
    foreach($answers as $thisans){
        $html .= "<input type='radio' value='$c' name='answer'>$thisans ";
        if($thisans == $rightanswer){
            $_SESSION['answerid'] = $c;
            $_SESSION['answer'] = $rightanswer;
            //echo "<script>console.log('$rightanswer');</script>"; //Debug answer.
        }
        $c++;
    }
    $html .= '</span><button onclick="submitAnswer();">Answer!</button>';
    return $html;   
}

function getResult($query){
    //Call Wolfram API
    $curl_handle = curl_init();
    curl_setopt($curl_handle, CURLOPT_URL,'http://api.wolframalpha.com/v2/query?appid=KEY&format=plaintext&input='.urlencode($query));
    curl_setopt( $curl_handle, CURLOPT_RETURNTRANSFER, true );
    $xml= curl_exec($curl_handle); // Execute the request
    //$xml = "";
    curl_close($curl_handle);
    
    //Extract result from XML
    $lxml=simplexml_load_string($xml);
    foreach($lxml->children() as $pod){
        $attributes = $pod->attributes();
        if ($attributes['title'] == 'Result'){
            return $pod->subpod->plaintext;   
        }
    }
    
}

//Constants
$elements = array('H'=>'Hydrogen','He'=>'Helium','Li'=>'Lithium','Be'=>'Beryllium','B'=>'Boron','C'=>'Carbon','N'=>'Nitrogen','O'=>'Oxygen','F'=>'Fluorine','Ne'=>'Neon','Na'=>'Sodium','Mg'=>'Magnesium','Al'=>'Aluminum','Si'=>'Silicon','P'=>'Phosphorus','S'=>'Sulfur','Cl'=>'Chlorine','Ar'=>'Argon','K'=>'Potassium','Ca'=>'Calcium','Sc'=>'Scandium','Ti'=>'Titanium','V'=>'Vanadium','Cr'=>'Chromium','Mn'=>'Manganese','Fe'=>'Iron','Co'=>'Cobalt','Ni'=>'Nickel','Cu'=>'Copper','Zn'=>'Zinc','Ga'=>'Gallium','Ge'=>'Germanium','As'=>'Arsenic','Se'=>'Selenium','Br'=>'Bromine','Kr'=>'Krypton','Rb'=>'Rubidium','Sr'=>'Strontium','Y'=>'Yttrium','Zr'=>'Zirconium','Nb'=>'Niobium','Mo'=>'Molybdenun','Tc'=>'Technetium','Ru'=>'Ruthenium','Pd'=>'Palladium','Ag'=>'Silver','Cd'=>'Cadmium','In'=>'Indium','Sn'=>'Tin','Sb'=>'Antimony','Te'=>'Tellurium','I'=>'Iodine','Xe'=>'Xenon','Cs'=>'Caesium','Ba'=>'Barium','La'=>'Lanthanum','Hf'=>'Hafnium','Ta'=>'Tantalum','W'=>'Tungsten','Rh'=>'Rhenium','Os'=>'Osmium','Ir'=>'Iridium','Pt'=>'Platinum','Au'=>'Gold','Hg'=>'Mercury','Ti'=>'Thallium','Pb'=>'Lead','Bi'=>'Bismuth','Po'=>'Polonium','At'=>'Astatine','Rn'=>'Radon');
$typesofquestions = 5;


$thisquestion = rand(1,$typesofquestions); //Select which question we are going to use
//$thisquestion = 2;
$usedelements = rand(1, 4);
$randelements = array_rand($elements, $usedelements);

$csymbols = array();
$celements = array();

//Get the element to be used in question
if ($usedelements == 1){
    $randelements = array_rand($elements, $usedelements);
    $qelement = $elements[$randelements];
}else{
    $qelement='';
    $c = 0;
    while ($c < $usedelements){
        $symbol = array_rand($elements, 1);
        $qelement.=$symbol;
        $c++;
    }
}

if($thisquestion == 1){
    //What is the Molar Mass of X
    $query='molar mass of '.$qelement;
    $answer = getResult($query);
    $formatted = str_replace(" (grams per mole)", "", $answer);
    $min = 1;
    $max = 1000;
    $choice1 = rand($min*1000, $max*1000) / 1000;
    $choice2 = rand($min*1000, $max*1000) / 1000;
    $question = "What is the molar mass of $qelement?";
    $number = $formatted;
    $html = formatHTML($question, $formatted,$choice1,$choice2);
    
    
} elseif($thisquestion == 2){
    //How many moles are in Y grams of X
    $min = 1;
    $max = 1000;
    $grams = rand($min*10, $max*10) / 10;
    $query = 'moles in '.$grams.' grams of '.$qelement;
    $answer = getResult($query);
    $formatted = str_replace(' (moles)','',$answer);
    $npos = strpos($answer,' ');
    $number = substr($answer,0,$npos);

    $min = 1;
    $max = 10.5;
    $choices = getAnswers($number,$min,$max);
    $choice1 = $choices[0].' mol';
    $choice2 = $choices[1].' mol';
    
    
    $question = "How many moles are in $grams grams of $qelement";
    $html = formatHTML($question,$formatted,$choice1,$choice2);
    
} elseif($thisquestion == 3){
    //How many grams are in Y moles of X
    $min = 1;
    $max = 100;
    $moles = rand($min*10, $max*10) / 10;
    $query = 'grams in '.$moles.' moles of '.$qelement;
    $answer = getResult($query);
    $formatted = $answer;
    $number = str_replace(' grams','',$answer);
    
    $min = 1;
    $max = 25;
    $choices = getAnswers($number,$min,$max);
    $choice1 = $choices[0].' grams';
    $choice2 = $choices[1].' grams';
    
    $question = "How many grams are in $moles moles of $qelement";
    $html = formatHTML($question, $formatted,$choice1,$choice2);
} /*elseif($thisquestion == 4){
    //How many (molecules/atoms) are in Y grams of X
    $min = 1;
    $max = 1000;
    $grams = rand($min*100, $max*100) / 100;
    $query = 'molecules in '.$grams.' grams of '.$qelement;
    $answer = getResult($query);
    $formatted = str_replace('Ã—',' * ',$answer);
    
    
} elseif($thisquestion == 5){
    //How many (molecules/atoms) are in Y moles of X
    $min = 1;
    $max = 100;
    $moles = rand($min*100, $max*100) / 100;
    $query = 'molecules in '.$moles.' moles of '.$qelement;
    $answer = getResult($query);
    $formatted = str_replace('Ã—',' * ',$answer);

    
}*/ elseif($thisquestion == 4){
    //How many grams are in Y molecules/atoms of X
    $min = 1;
    $max = 25;
    $power = rand(22,28);
    $base = rand($min*10, $max*10) / 10;
    $query  = 'grams in '.$base.'*10^'.$power.' molecules of '.$qelement;
    $answer = getResult($query);
    $formatted = $answer;
    $number = str_replace(' grams','',$answer);
    $min = 1;
    $max = 25;
    
    $choices = getAnswers($number,$min,$max);
    $choice1 = $choices[0].' grams';
    $choice2 = $choices[1].' grams';
    
    if($usedelements == 1){
        $type = 'atoms';
    } else {
        $type = 'molecules';   
    }
    
    $question = "How many grams are in $base x 10<sup>$power</sup> $type of $qelement";
    $html = formatHTML($question, $formatted,$choice1,$choice2);
    
    
     
    
} elseif($thisquestion == 5){
    //How many moles are in Y molecules/atoms of X
    $min = 1;
    $max = 10;
    $power = rand(22,28);
    $base = rand($min*10, $max*10) / 10;
    $query = 'moles in '.$base.'*10^'.$power.' molecules of '.$qelement;
    $answer = getResult($query);
    $formatted = str_replace(' (moles)','',$answer);
    $number = str_replace(' mol (moles)','',$answer);
    $min = 1;
    $max = 10.5;
    $choices = getAnswers($number,$min,$max);
    $choice1 = $choices[0].' mol';
    $choice2 = $choices[1].' mol';
    
    if($usedelements == 1){
        $type = 'atoms';
    } else {
        $type = 'molecules';   
    }
    
    $question = "How many moles are in $base x 10<sup>$power</sup> $type of $qelement";
    $html = formatHTML($question, $formatted,$choice1,$choice2);
}

echo $html;
?>
