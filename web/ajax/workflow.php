<?php
ini_set('display_errors', 0) ;

if(strlen($_POST['state']) > 0) {
    var_dump($_POST['state']);
    exit;
    $state = $_POST['state'];
    }

$path = $_POST['path'];

if($path == "start"){
    $state['form'] = "s4etchiki";
    $state['next'] = "graphic";
    $state['back'] = "";

    
}

if($state['form'] == 's4etchiki' && $path == 'next'){
    //$state['history'][0] = "s4etchiki";
    $state['form'] = "graphic";
    $state['next'] = "change";
    $state['back'] = "s4etchiki";
}
if($state['form'] == 'graphic' && $path == 'back'){
    //$state['history'][0] = "graphic";
    $state['form'] = "s4etchiki";
    $state['next'] = "graphic";
    $state['back'] = "";
}

$jstate = json_encode($state);
// echo $state['form'];
// echo <br>;
// echo $path;
//exit;
header('Content-Type: application/json');
echo $jstate;
?>