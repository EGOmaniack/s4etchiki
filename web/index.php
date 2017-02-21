<?php
$dbconn = pg_connect("host=localhost port=5432 dbname=s4etchiki user=postgres password=Rgrur4frg56eq16")
    or die('Could not connect: ' . pg_last_error());


$result = pg_query($dbconn, "select id, to_char(\"date\",'DD-MM-YYYY') date , light_day, light_night, kichen_water_c, kichen_water_h, bath_water_c, bath_water_h from  s4etchiki.data ORDER BY id DESC LIMIT 1") or die('Ошибка запроса: ' . pg_last_error()); 

$id;
while ($line = pg_fetch_assoc($result)) {   
    foreach ($line as $col_key => $col_value ) { 
        if($col_key != "id")echo "\t<input id=".$id.$col_key." type='text' value=".$col_value."><lable>$col_key</lable>\n<br>";
        else
        {
            $id = $col_value;
             echo "\t <input type='hidden' id='dbid' value=".$col_value.">\n";
        }
    }
    echo "<hr>";
}
echo "<input type='button' value='Изменить' id='btnupdate'>\n";

pg_free_result($result);
pg_close($dbconn);

//генерируем число
$sek = strtotime("now");
?>
<!DOCTYPE>
<html>
    <head>
        <script type="text/javascript" src = "js/jquery.min.js" ></script>
        <link rel="stylesheet" href="css/main.css?<?=$sek?>">
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <title>Счетчики</title>
    </head>
    <body>

        <h2>Счетчики</h2>
        <input placeholder="Свет день" type="number" id="light_day">
        <br>
        <input placeholder="Свет ночь" type="number" id="light_night">
        <br>
        <input placeholder="вода кухня холодная" type="number" id="kichen_water_c">
        <br>
        <input placeholder="Вода кухня горячая" type="number" id="kichen_water_h">
        <br>
        <input placeholder="Вода ванна холодная" type="number" id="bath_water_c">
        <br>
        <input placeholder="Вода ванна горячая" type="number" id="bath_water_h">
        <br>
        <input type="button" value="Отправить" id="btninsert">
        <br>
        <div id="cont"></div>
        <br><br>



        <input type="hidden" class="class1" value="111"/>
        <input type="hidden" class="class1" value="222"/>
        <input type="hidden" class="class1" value="333"/>
        
        <script>
            $(function(){
                $(".class1").each(function(i,e){
                     //console.log(i);
                     //console.log($(e).val());
                })
            });
        </script>

    <script type="text/javascript" src = "js/main.js?<?=$sek?>" ></script>
    </body>
</html>