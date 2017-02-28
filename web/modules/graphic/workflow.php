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

$_SESSION['workflow'] = $screens;

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