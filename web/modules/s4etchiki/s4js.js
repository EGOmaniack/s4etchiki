function s4etchiki (){
                $("#content").html('');
                //var form = '<h2>Новые данные</h2>';
                var form ='<div class="form"><input placeholder="Свет день" type="number" id="light_day">';
                form += '<br><input placeholder="Свет ночь" type="number" id="light_night">';
                form += '<br><input placeholder="вода кухня холодная" type="number" id="kichen_water_c">';
                form += '<br><input placeholder="Вода кухня горячая" type="number" id="kichen_water_h">';
                form += '<br><input placeholder="Вода ванна холодная" type="number" id="bath_water_c">';
                form += '<br><input placeholder="Вода ванна горячая" type="number" id="bath_water_h">';
                form += '<br><div class="btn small green" id="btn_insert">Отправить</div>';
                form += '<br><br></div>';
                $("#content").html(form);
                $("#title").html('Введите данные');
            }
s4etchiki();

$('#btn_insert').click(function () {
    this.value = "Отправка..";
    self = this;
    $.post("/ajax/insert.php", {
        light_day: $('#light_day').val(),
        light_night: $('#light_night').val(),
        kichen_water_c: $('#kichen_water_c').val(),
        kichen_water_h: $('#kichen_water_h').val(),
        bath_water_c: $('#bath_water_c').val(),
        bath_water_h: $('#bath_water_h').val()
    }, function (data) {
        if(data != undefined){
            self.value = "Отправлено";
            $(".form").children().val("");
        }
    });
});