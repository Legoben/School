<?php 
        if (isset($_GET['p']) && $_GET['p'] != ''){
            include 'pages/'.$_GET['p'].'.html';
        } else {
            include 'home.php';   
        }
?>