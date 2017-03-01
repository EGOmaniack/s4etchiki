function changedata (){
    $("#content").html('');
    $.get("/ajax/lastdata.php", function (data) {
        $("#content").html(data);
    });
    $("#title").html('Предыдущие данные');
}
changedata();

$(document.body).on('click', '#btn_update', function(){
    alert(111);
    this.value = "меняем...";
    var id = $("#dbid").val();
    $.ajax({
        url: "/ajax/update.php",
        method: "POST",
        data: {
            dbid: id,
            date: $('#date').val(),
            light_day: $('#' + id + 'light_day').val(),
            light_night: $('#' + id + 'light_night').val(),
            kichen_water_c: $('#' + id + 'kichen_water_c').val(),
            kichen_water_h: $('#' + id + 'kichen_water_h').val(),
            bath_water_c: $('#' + id + 'bath_water_c').val(),
            bath_water_h: $('#' + id + 'bath_water_h').val()
        },
        dataType: "json"
    }).done(function (data) {
        this.value = "Готово";
        alert(data);
    });
});