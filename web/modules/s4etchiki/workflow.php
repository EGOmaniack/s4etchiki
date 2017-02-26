<?php
ini_set('display_errors', 0) ;
ini_set('xdebug.var_display_max_depth', 10);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);


$xmlka = file_get_contents("workflow.xml");
$xml = simplexml_load_string($xmlka);

$screens;

foreach($xml->graphic as $value) {
    foreach($value->state as $elem){
        $screen['state']['go-next'] = (string)$elem->attributes()['go-next'];
        $screen['state']['go-back'] = (string)$elem->attributes()['go-back'];
    }
    foreach($value->orcestration as $elem){
        $screen['orcestration']['init'] = (string)$elem->attributes()['init'];
    }
    
    $screens[((string)$value->attributes()['name'])]=$form;
    unset($screen);
}

// $_SESSION['workflow'] = $forms;
// $include = 'orcestration/'.$_SESSION['workflow'][$_GET['flow']]['orcestration']['init'].'.php';
// echo $include;
// exit;
?>