<?php
ini_set('display_errors', 0) ;
ini_set('xdebug.var_display_max_depth', 10);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);

$xmlka = file_get_contents(dirname(__FILE__)."/workflow.xml");

$json = XML2JSON($xmlka);
$arr = json_decode($json, true);

$screens;

foreach($arr['graphic'] as $value) {
    $screen = $value;
    if($value['start'] == true){ $screens['start'] = $value['name']; }
    if( count($screen['state']) > 1 ) { 
        foreach($screen['state'] as $state){
            foreach($state as $key => $elem){
                $states[$key] = $elem;
            }
        }
        unset($screen['state']);
        $screen['state'] = $states;
        unset($states);
     }
    $screens[$value['name']] = $screen;
    unset($screen);
}

// var_dump($screens);
// exit;



//$xml = simplexml_load_string($xmlka);


/*
foreach($xml->graphic as $value) {
        if((string)$value->attributes()['start'] == 'true'){
            $screens['start'] = ((string)$value->attributes()['name']);
        }
        $screen['name'] = (string)$value->attributes()['name'];

    foreach($value->state as $key => $elem){
        //в каждом state есть только один вариант. либо go_next либо go_back и они друг
        //друга перетирают
        $screen['state']['go_next'] = (string)$value->state->attributes()['go-next'];
        $screen['state']['go_back'] = (string)$value->state->attributes()['go-back'];
    }
    foreach($value->orcestration as $elem){
        $screen['orcestration']['init'] = (string)$elem->attributes()['init'];
    }
    
    $screens[((string)$value->attributes()['name'])]=$screen;
    unset($screen);
}
var_dump($screens);
*/


$_SESSION['workflow'] = $screens;
// $include = 'orcestration/'.$_SESSION['workflow'][$_GET['flow']]['orcestration']['init'].'.php';
// echo $include;
// exit;


function XML2JSON($xml) {

        function normalizeSimpleXML($obj, &$result) {
            $data = $obj;
            if (is_object($data)) {
                $data = get_object_vars($data);
            }
            if (is_array($data)) {
                foreach ($data as $key => $value) {
                    $res = null;
                    normalizeSimpleXML($value, $res);
                    if (($key == '@attributes') && ($key)) {
                        $result = $res;
                    } else {
                        $result[$key] = $res;
                    }
                }
            } else {
                $result = $data;
            }
        }
        normalizeSimpleXML(simplexml_load_string($xml), $result);
        return json_encode($result);
    }
?>