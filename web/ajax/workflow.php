<?php
ini_set('display_errors', 0) ;
ini_set('xdebug.var_display_max_depth', 5);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);


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
// var_dump($forms);
// exit();


// echo $_POST['state']['form'];
// exit;
// if(strlen($_POST['state']) > 0) {
//     $state = $_POST['state'];
// }

$path = $_POST['path'];
$curform = $_POST['state']['form'];
// $path = 'next';
// $curform = 's4etchiki';


if($path == "start"){
    $state['form'] = $defstate;
}else{
    $state['form'] = $forms[$curform][$path];

    // foreach($forms as $form){
    //     if($form['name'] == $curform){
    //         var_dump($form);
    //     }
    // }
}

// if($path == "start"){
//     $state['form'] = "s4etchiki";
//     $state['next'] = "graphic";
//     $state['back'] = "";  
// }
// if($_POST['state']['form'] == 's4etchiki' && $path == 'next'){
//     //$state['history'][0] = "s4etchiki";
//     $state['form'] = "graphic";
//     $state['next'] = "change";
//     $state['back'] = "s4etchiki";
// }
// if($_POST['state']['form'] == 'graphic' && $path == 'back'){
//     //$state['history'][0] = "graphic";
//     $state['form'] = "s4etchiki";
//     $state['next'] = "graphic";
//     $state['back'] = "";
// }

$jstate = json_encode($state);
// echo $state['form'];
// echo <br>;
// echo $path;
//exit;
header('Content-Type: application/json');
echo $jstate;
?>