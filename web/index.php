<?php

// $dbconn = pg_connect("host=localhost port=5432 dbname=s4etchiki user=postgres password=Rgrur4frg56eq16")
//     or die('Could not connect: ' . pg_last_error());


// $result = pg_query($dbconn, "select id, to_char(\"date\",'DD-MM-YYYY') date , light_day, light_night, kichen_water_c, kichen_water_h, bath_water_c, bath_water_h from  s4etchiki.data ORDER BY id DESC LIMIT 1") or die('Ошибка запроса: ' . pg_last_error()); 

// $id;
// while ($line = pg_fetch_assoc($result)) {   
//     foreach ($line as $col_key => $col_value ) { 
//         if($col_key != "id")echo "\t<input id=".$id.$col_key." type='text' value=".$col_value."><lable>$col_key</lable>\n<br>";
//         else
//         {
//             $id = $col_value;
//              echo "\t <input type='hidden' id='dbid' value=".$col_value.">\n";
//         }
//     }
//     echo "<hr>";
// }
// echo "<input type='button' value='Изменить' id='btnupdate'>\n";

// pg_free_result($result);
// pg_close($dbconn);

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

        <h2>Контроль показателей</h2>

        <h2 id='title'></h2>
        <div id='content'>
        </div>
        <input class="btn back" type="button" value="Назад">
        <input class="btn next" type="button" value="Вперед">
        <script type="text/javascript" src = "js/main.js?<?=$sek?>" ></script>
        <script>
        window.state = "";

        
        
            function s4etchiki (){
                $("#content").html('');
                var form ='<input placeholder="Свет день" type="number" id="light_day">';
                form += '<br><input placeholder="Свет ночь" type="number" id="light_night">';
                form += '<br><input placeholder="вода кухня холодная" type="number" id="kichen_water_c">';
                form += '<br><input placeholder="Вода кухня горячая" type="number" id="kichen_water_h">';
                form += '<br><input placeholder="Вода ванна холодная" type="number" id="bath_water_c">';
                form += '<br><input placeholder="Вода ванна горячая" type="number" id="bath_water_h">';
                form += '<br><input class="insert" type="button" value="Отправить" id="btn_insert" onclick ="change_state">';
                form += '<br><br>';
                $("#content").html(form);
                $("#title").val('Счетчики');
            }

            function graphic () {
                $("#content").html('');
                $("#title").val('Графики');

                $.getJSON("/ajax/get.php", function (data) {
                var difference = get_difference2(data);
                //console.log(difference);
                svg_canvas(difference, "light_day", "light_night");
                svg_canvas(difference, "kichen_water_c", "kichen_water_h");
                svg_canvas(difference, "bath_water_c", "bath_water_h");
                });
            }
            
            function changedata (data){}
            function getdata (data){}
            
            function changestate (data){
                if(data.form == 's4etchiki'){
                    s4etchiki();
                }
                if(data.form == 'graphic'){
                    graphic();
                }
            }

            function workflow(path){
                $.post("/ajax/workflow.php", {
                    "path" : path,
                    "state" : state
                }, function (data) {
                    
                   //console.log(data);   
                   state = data;
                   changestate(data);
                   //console.log(state.form);
                });
                
            }
            



            $(".btn").click(function(data){
                var path = this.className.split(' ')[1];
                workflow(path);
            });

            workflow("start");

        </script>
 

    </body>
</html>