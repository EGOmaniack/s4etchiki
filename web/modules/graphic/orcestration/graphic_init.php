<?php
$dbconn = pg_connect("host=localhost port=5432 dbname=s4etchiki user=postgres password=Rgrur4frg56eq16")
    or die('Could not connect: ' . pg_last_error());


$result = pg_query($dbconn, "select id, date , light_day, light_night, kichen_water_c, kichen_water_h, bath_water_c, bath_water_h from  s4etchiki.data ORDER BY id DESC LIMIT 31") or die('Ошибка запроса: ' . pg_last_error()); 

while ($line = pg_fetch_assoc($result)) {   
    foreach ($line as $col_key => $col_value ) { 
        $temp[$col_key] = $col_value;
    }
    $array[] = $temp;
    unset($temp);
}

echo json_encode($array);
?>