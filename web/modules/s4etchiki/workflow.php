<?php
ini_set('display_errors', 0) ;
ini_set('xdebug.var_display_max_depth', 10);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);

$path = $_POST['path'];
$curform = $_POST['state']['form'];

$xmlka = file_get_contents("workflow.xml");

// $a = json_decode(json_encode((array) simplexml_load_string($xmlka)),1);
// var_dump($a);
// exit;
$xml = simplexml_load_string($xmlka);
$defstate = (string)$xml->formlist->attributes()['start'];
$forms;
foreach($xml->formlist->form as $value) {
    foreach($value->state as $elem){
        $form[(string)$elem->attributes()['btn']]['state'] = (string)$elem->attributes()['form'];
    }
    $forms[((string)$value->attributes()['name'])]=$form;
    unset($form);
}
$_SESSION['workflow'] = $forms;
// $include = 'orcestration/'.$_SESSION['workflow'][$_GET['flow']]['orcestration']['init'].'.php';
// echo $include;
// exit;
?>