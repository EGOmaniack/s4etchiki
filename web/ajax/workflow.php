<?php
ini_set('display_errors', 0) ;
ini_set('xdebug.var_display_max_depth', 5);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);

$path = $_POST['path'];
$curform = $_POST['state']['form'];

$xmlka = file_get_contents("../workflow.xml");
$xml = simplexml_load_string($xmlka);
$defstate = (string)$xml->formlist->attributes()['start'];
$forms;
foreach($xml->formlist->form as $value) {
    foreach($value->state as $key => $elem){
        $form[(string)$elem->attributes()['btn']] = (string)$elem->attributes()['form'];
    }
    $forms[((string)$value->attributes()['name'])]=$form;
    unset($form);
}

if($path == "start"){
    $state['form'] = $defstate;
    $state['next'] = $forms[$defstate]['next'];
    $state['back'] = null;
}else{
    $state['form'] = $forms[$curform][$path];
    $state['next'] = $forms[$forms[$curform][$path]]['next'];
    $state['back'] = $forms[$forms[$curform][$path]]['back'];
}

$jstate = json_encode($state);

header('Content-Type: application/json');
echo $jstate;
?>