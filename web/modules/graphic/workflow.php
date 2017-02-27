<?php
ini_set('display_errors', 0) ;
ini_set('xdebug.var_display_max_depth', 10);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);

$xmlka = file_get_contents(dirname(__FILE__)."/workflow.xml");

$json = XML2JSON($xmlka);
$arr = json_decode($json, true);
var_dump($arr);
exit;


/*
$xml = simplexml_load_string($xmlka);

$screens;

foreach($xml->graphic as $value) {
        if((string)$value->attributes()['start'] == 'true'){
            $screens['start'] = ((string)$value->attributes()['name']);
        }
        $screen['name'] = (string)$value->attributes()['name'];
        var_dump($value->state);
    foreach($value->state as $key => $elem){       
        $screen['state']['go_next'] = (string)$elem->attributes()['go-next'];
        $screen['state']['go_back'] = (string)$elem->attributes()['go-back'];
    }
    foreach($value->orcestration as $elem){
        $screen['orcestration']['init'] = (string)$elem->attributes()['init'];
    }
    
    $screens[((string)$value->attributes()['name'])]=$screen;
    unset($screen);
}
*/
//var_dump($screens);
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