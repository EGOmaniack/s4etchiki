$(function(){
   
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

        var s4data = [];
        
         $.post( "/ajax/get.php", function( data ) {
            //alert( "Data Loaded: " + data );
            s4data = JSON.parse(data);
            //alert(s4data);
        });


    var width = 1000;
    var height = 550;
    var array = [20, 40, 50 ,60 ,70 ,35, 110 , 21, 55, 12, 33];

    var widthScale = d3.scaleLinear()
        .domain([0, 110])
        .range([0, height-15]);

    var color = d3.scaleLinear()
        .domain([0, 110])
        .range(["blue", "red"]);

    var canv = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height);
    var circule = canv.append("circle")
        .attr("cx",250)
        .attr("cy",250)
        .attr("r",50)
        .attr("fill", "red");
    var l = canv.append("line")
        .attr("x1",0)
        .attr("y1",100)
        .attr("x2",400)
        .attr("y2",400)
        .attr("stroke","green")
        .attr("stroke-width",5);
    var bars = canv.selectAll("rect")
        .data(array)
        .enter()
            .append("rect")
            .attr("width",15)//function(d){return d;})
            .attr("height",function(d){return widthScale(d);})
            .attr("y",function(d){return height-widthScale(d);})
            .attr("x", function(d , i){ return i * 20;})
            // .attr("fill", function(d,i){
            //     if(i % 2 == 0 )return "red"
            //     else return "green"
            .attr("fill",function(d) {return color(d)});

          
});