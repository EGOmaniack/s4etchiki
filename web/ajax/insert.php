<?php

// $data = file_get_contents('php://input');
// // echo $data;
// // exit;
// $inputarr = json_decode($data,true);
$lightd = $_POST['light_day'];
// echo $lightd;
// exit;
// echo $inputarr['light_day'];
// exit;
$lightn = $_POST['light_night'];
$wat_kit_hot = $_POST['kichen_water_h'];
$wat_kit_cold = $_POST['kichen_water_c'];
$wat_bath_hot = $_POST['bath_water_h'];
$wat_bath_cold = $_POST['bath_water_c'];

$dbconn = pg_connect("host=localhost port=5432 dbname=s4etchiki user=postgres password=Rgrur4frg56eq16")
    or die('Could not connect: ' . pg_last_error());


$sqlstr = "insert into s4etchiki.data(light_day,light_night,kichen_water_h,kichen_water_c,bath_water_h, bath_water_c) ";
$sqlstr .= "values(".$lightd.",".$lightn.",".$wat_kit_hot.",".$wat_kit_cold.",".$wat_bath_hot.",".$wat_bath_cold.")";
// echo 111;
// exit;
$result = pg_query($dbconn, $sqlstr) or die('Ошибка запроса: ' . pg_last_error()); 

pg_free_result($result);
pg_close($dbconn);

echo'inserted';
?>
