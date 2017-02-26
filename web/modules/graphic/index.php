<?php
include_once 'workflow.php';
$path = '/modules/graphic/orcestration/orcestration.php';
$_SESSION["workflow"]['path'] = $path;
$sek = strtotime("now");
$castomcss = '<link rel="stylesheet" href="modules/graphic/graph.css?'.$sek.'">';
//echo '<a href="www.google.ru">ссылочка</a>';
$castomjs2 = '<script type="text/javascript" src = "modules/graphic/graph.js?'.$sek.'" ></script>';
$json = json_encode($_SESSION["workflow"]);
$castomjs = '<script type="text/javascript" > window.workflow = '.$json.'; </script>';
?>
