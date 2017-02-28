<?php
$dbconn = pg_connect("host=localhost port=5432 dbname=s4etchiki user=postgres password=Rgrur4frg56eq16")
    or die('Could not connect: ' . pg_last_error());

$result = pg_query($dbconn, "select id, to_char(\"date\",'DD-MM-YYYY') date , light_day, light_night, kichen_water_c, kichen_water_h, bath_water_c, bath_water_h from  s4etchiki.data ORDER BY id") or die('Ошибка запроса: ' . pg_last_error()); 

echo "<table>\n";
while ($line = pg_fetch_assoc($result)) {
    echo "\t<tr>\n";
    foreach ($line as $col_key => $col_value ) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";


pg_free_result($result);
pg_close($dbconn);
?>
