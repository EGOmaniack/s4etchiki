<?php
$ansver;
$ansver = "<h2>Последние данные</h2>";
$dbconn = pg_connect("host=localhost port=5432 dbname=s4etchiki user=postgres password=Rgrur4frg56eq16")
    or die('Could not connect: ' . pg_last_error());


$result = pg_query($dbconn, "select id, to_char(\"date\",'DD-MM-YYYY') date , light_day, light_night, kichen_water_c, kichen_water_h, bath_water_c, bath_water_h from  s4etchiki.data ORDER BY id DESC LIMIT 1") or die('Ошибка запроса: ' . pg_last_error()); 

$id;
while ($line = pg_fetch_assoc($result)) {   
    foreach ($line as $col_key => $col_value ) { 
        if($col_key != "id")$ansver .= "\t<input id=".$id.$col_key." tipe='text' value=".$col_value."><lable>$col_key</lable>\n<br>";
        else
        {
            $id = $col_value;
             $ansver .= "\t <input type='hidden' id='dbid' value=".$col_value.">\n";
        }
    }
    $ansver .= "<hr>";
}
$ansver .= "<input type='button' value='Изменить' id='btnupdate'>\n";

pg_free_result($result);
pg_close($dbconn);

echo $ansver;
?>