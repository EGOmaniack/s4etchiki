
        window.state = "";

        
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
            
            function changedata (){
                $("#content").html('');
                $.get("/ajax/lastdata.php", function (data) {
                    $("#content").html(data);
                });
                $("#title").val('Предыдущие данные');
            }
            
            function changestate (data){
                //кнопки back и next отображать не?
                if(data.next == null){$('.next').addClass('hide');}else{$('.next').removeClass('hide');}
                if(data.back == null){$('.back').addClass('hide');}else{$('.back').removeClass('hide');}
                if(data.form == 's4etchiki'){
                    s4etchiki();
                }
                if(data.form == 'graphic'){
                    graphic();
                }
                if(data.form == 'changedata'){
                    changedata();
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