function s4etchiki (){
                $("#content").html('');
                //var form = '<h2>Новые данные</h2>';
                var form ='<div class="form"><input placeholder="Свет день" type="number" id="light_day">';
                form += '<br><input placeholder="Свет ночь" type="number" id="light_night">';
                form += '<br><input placeholder="вода кухня холодная" type="number" id="kichen_water_c">';
                form += '<br><input placeholder="Вода кухня горячая" type="number" id="kichen_water_h">';
                form += '<br><input placeholder="Вода ванна холодная" type="number" id="bath_water_c">';
                form += '<br><input placeholder="Вода ванна горячая" type="number" id="bath_water_h">';
                form += '<br><input class="insert" type="button" value="Отправить" id="btn_insert" onclick ="change_state">';
                form += '<br><br></div>';
                $("#content").html(form);
                $("#title").val('Счетчики');
            }
s4etchiki();