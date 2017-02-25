<?php
//var_dump($_SESSION['workflow']);

$forms = $_SESSION['workflow'];

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

//header('Content-Type: application/json');
echo $state;
?>