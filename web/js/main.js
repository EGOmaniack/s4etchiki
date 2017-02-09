var s4data = [];

$(function(){
    var promesed = promesGET();
    promesed.done(function (d){
    svg_canvas(d);
    });
    
        
// $.post( "/ajax/get.php", function( data ) {
    //     //alert( "Data Loaded: " + data );
    //     s4data = JSON.parse(data);
    //     //alert(s4data.length);
    //     //alert(s4data);
    // });

    // //post еще не вернул ничего
    // var light_day_array = [];
    // //Вытащить данные для первого графика
    // for(i=0;i<s4data.length; i++)
    // {
    //     light_day_array = [i, s4data[i].light_day];
    // }
    // //alert(light_day_array);

});

$('#btninsert').click(function(){
       this.value="Отправка...";
       $.ajax({
           url: "/ajax/insert.php",
           method: "POST",
           data: { light_day : $('#light_day').val(),
           light_night : $('#light_night').val(),
           kichen_water_c : $('#kichen_water_c').val(),
           kichen_water_h : $('#kichen_water_h').val(),
           bath_water_c : $('#bath_water_c').val(),
           bath_water_h : $('#bath_water_h').val() },
           dataType: "json"

       }).done(function(data){
           this.value = "Готово";
            alert(data);
       });
       $('#light_day').val('');
       $('#light_night').val('');
       $('#kichen_water_h').val('');
       $('#kichen_water_c').val('');
       $('#bath_water_h').val('');
       $('#bath_water_c').val('');

       
    });

$('#btnupdate').click(function(){
        this.value="меняем...";
        var id = $("#dbid").val();
        $.ajax({
        url : "/ajax/update.php",
        method: "POST",
           data: { 
            dbid : id,
            date : $('#date').val(),
            light_day : $('#' + id +'light_day').val(),
            light_night : $('#' + id +'light_night').val(),
            kichen_water_c : $('#' + id +'kichen_water_c').val(),
            kichen_water_h : $('#' + id +'kichen_water_h').val(),
            bath_water_c : $('#' + id +'bath_water_c').val(),
            bath_water_h : $('#' + id +'bath_water_h').val()},
           dataType: "json"
        }).done(function(data){
            this.value = "Готово";
            alert(data);
        });
});


function svg_canvas(data){

    var width = 500;
    var height = 300;

    var arr = [
        {"id":125, "light_day": 6120.25},
        {"id":124, "light_day":6110.67},
        {"id":123, "light_day":6105.06},
        {"id":122,"light_day":6095.04}
        ];

    // var widthScale = d3.scaleLinear()
    //     .domain([0, 110])
    //     .range([0, height-15]);

     var scale = d3.scaleLinear()
         .domain([0, 7000])
         .range([0, height-15]);

    var canv = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    var group = canv.append("g");

    var line_lday = d3.line()
        .x(function (d){return scale(2*d.id*10);})
        .y(function(d){return scale(d.light_day);});

    var bars = group.selectAll("path")
        .data([data])
        .enter()
            .append("path")
            .attr("d",line_lday)//function(d){return d;})
            .attr("fill","none")
            .attr("stroke", "#000")
            .attr("stroke-width", 2);
}

function promesGET(){
    return $.ajax({
        url : "/ajax/get.php",
        dataType : "json",
        type : "POST"
        });
}