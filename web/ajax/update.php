<?php


$lightd = $_POST['light_day'] ?? "0";
$lightn = $_POST['light_night'] ?? "0";
$wat_kit_hot = $_POST['kichen_water_h'] ?? "0";
$wat_kit_cold = $_POST['kichen_water_c'] ?? "0";
$wat_bath_hot = $_POST['bath_water_h'] ?? "0";
$wat_bath_cold = $_POST['bath_water_c'] ?? "0";

$dbconn = pg_connect("host=localhost port=5432 dbname=s4etchiki user=postgres password=Rgrur4frg56eq16")
    or die('Could not connect: ' . pg_last_error());


$sqlstr = "update s4etchiki.data";
$sqlstr .= " SET light_day =".$lightd.", ";
$sqlstr .= "light_night = ".$lightn.", ";
$sqlstr .= "kichen_water_h = ".$wat_kit_hot.", ";
$sqlstr .= "kichen_water_c = ".$wat_kit_cold.", ";
$sqlstr .= "bath_water_h = ".$wat_bath_hot.", ";
$sqlstr .= "bath_water_c = ".$wat_bath_cold." ";
$sqlstr .= "WHERE id = ".$_POST['dbid'].";";

// echo $sqlstr;
// exit;
$result = pg_query($dbconn, $sqlstr) or die('Ошибка запроса: ' . pg_last_error()); 

pg_free_result($result);
pg_close($dbconn);

echo'inserted';
?>