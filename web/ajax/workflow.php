<?php
//ini_set('display_errors', 0) ;
$xmlka = file_get_contents("../workflow.xml");



//$states = new SimpleXMLElement($xmlka);

$xml = simplexml_load_string($xmlka);

$defstate = $xml->formlist->attributes()['start'];

$forms;

foreach($xml->formlist->form as $value) {
    //echo $key,'="',$value,"\"\n";
    $forms['name'] = ((string)$value->attributes()['name']);
    foreach($value->state as $elem){
        var_dump($elem->attributes());
        $forms['name']['state'] = (array)$elem->attributes();
    }
}
var_dump($forms);
exit;
var_dump($states);
exit();



// echo $_POST['state']['form'];
// exit;
if(strlen($_POST['state']) > 0) {

    $state = $_POST['state'];
}

$path = $_POST['path'];

if($path == "start"){
    $state['form'] = "s4etchiki";
    $state['next'] = "graphic";
    $state['back'] = "";

    
}

if($_POST['state']['form'] == 's4etchiki' && $path == 'next'){
    //$state['history'][0] = "s4etchiki";
    $state['form'] = "graphic";
    $state['next'] = "change";
    $state['back'] = "s4etchiki";
}
if($_POST['state']['form'] == 'graphic' && $path == 'back'){
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