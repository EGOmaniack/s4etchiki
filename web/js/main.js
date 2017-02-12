$(function(){
    var promesed = promesGET();
    promesed.done(function (d){
        var difference = get_difference2(d);
        //console.log(difference);
        svg_canvas(difference,"light_day","light_night");
        svg_canvas(difference,"kichen_water_c","kichen_water_h");
        svg_canvas(difference,"bath_water_c","bath_water_h");
    });
});
function get_difference2(d){
    var all_diff = [];
    var maxld = 0,maxln = 0,maxkc = 0,maxkh = 0,maxbc = 0,maxbh = 0;

    for(i = 1 ; i < d.length ; i++){
        var dif = [];
        dif['id'] = i-1;
        dif['date'] = d[i].date;
        dif['light_day'] = Math.abs(d[i].light_day - d[i-1].light_day);
        maxld = Math.max(dif['light_day'], maxld);
        dif['light_night'] = Math.abs(d[i].light_night - d[i-1].light_night);
        maxln = Math.max(dif['light_night'], maxln);
        dif['kichen_water_c'] = Math.abs(d[i].kichen_water_c - d[i-1].kichen_water_c);
        maxkc = Math.max(dif['kichen_water_c'], maxkc);
        dif['kichen_water_h'] = Math.abs(d[i].kichen_water_h - d[i-1].kichen_water_h);
        maxkh = Math.max(dif['kichen_water_h'], maxkh);
        dif['bath_water_c'] = Math.abs(d[i].bath_water_c - d[i-1].bath_water_c);
        maxbc = Math.max(dif['bath_water_c'], maxbc);
        dif['bath_water_h'] = Math.abs(d[i].bath_water_h - d[i-1].bath_water_h);
        maxbh = Math.max(dif['bath_water_h'], maxbh);
        all_diff[i-1] = dif;
        all_diff["max_light_day"] = maxld;
        all_diff['max_light_night'] = maxln;
        all_diff['max_kichen_water_c'] = maxkc;
        all_diff['max_kichen_water_h'] = maxkh;
        all_diff['max_bath_water_c'] = maxbc;
        all_diff['max_bath_water_h'] = maxbc;
        delete dif;
    }
    return all_diff;
}
function get_difference(d, key){
    var adif = [];
    if(key == undefined) key = 'light_day';
    for(var i = 1 ; i<d.length ; i++){
        var dif=[];
        dif['id'] = i-1;
        d.forEach(function(item,j,d){
            if(j = key){
                dif[key] = Math.abs(d[i][j] - d[i-1][j]);
            }
            //dif["light_day"] = d[i].light_day - d[i-1].light_day;
        });
        
        adif[i-1] = dif;
        delete dif;
    }
    return adif;
}

$('#btninsert').click(function(){
    this.value="Отправка..";
    self = this;
    $.ajax({
  url: "/ajax/insert.php",
  type : "POST",
  contentType: "application/json; charset=utf-8",
  data: { light_day : $('#light_day').val(),
           light_night : $('#light_night').val(),
           kichen_water_c : $('#kichen_water_c').val(),
           kichen_water_h : $('#kichen_water_h').val(),
           bath_water_c : $('#bath_water_c').val(),
           bath_water_h : $('#bath_water_h').val() },
           dataType: "json",
    success: function(a){
      //$('#btninsert').val(a);
      self.value = a;
      alert(a);
//      this.bbb = 5;
//      console.log(this);
    }
});
//alert(self.value);

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


function svg_canvas(data, key, key2){

    var width = 500;
    var height = 300;

    var arr = [
        {"id":125, "light_day":6120.25},
        {"id":124, "light_day":6110.67},
        {"id":123, "light_day":6105.06},
        {"id":122, "light_day":6095.04}
        ];

    // var widthScale = d3.scaleLinear()
    //     .domain([0, 110])
    //     .range([0, height-15]);

    var scale = d3.scaleLinear()
         .domain([0, Math.max(data['max_'+ key], data['max_' + key2])])
         .range([height-15, 0]);

    var scaleid = d3.scaleLinear()
         .domain([0, 30])
         .range([width-15, 0]);

    var canv = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    var group = canv.append("g");

    var line_1 = d3.line()
        .x(function (d){return scaleid(d.id);})
        .y(function(d){return scale(d[key]);});

    var line_2 = d3.line()
        .x(function (d){return scaleid(d.id);})
        .y(function(d){return scale(d[key2]);});

    var graf1 = group.selectAll("line")
        .data([data])
        .enter()
            .append("path")
            .attr("d",line_1 )//function(d){return d;})
            .attr("fill","none")
            .attr("stroke", "#4A7EBB")
            .attr("stroke-width", 3);

    var graf2 = group.selectAll("line")
        .data([data])
        .enter()
            .append("path")
            .attr("d",line_2 )//function(d){return d;})
            .attr("fill","none")
            .attr("stroke", "#BE4B48")
            .attr("stroke-width", 3);
            
    /*var graf2 = group.append("path")
            .attr("d",line_lnight)
            .attr("fill","none")
            .attr("stroke", "#BE4B48")
            .attr("stroke-width", 3);*/
}

function promesGET(){
    return $.ajax({
        url : "/ajax/get.php",
        dataType : "json",
        type : "POST"
        });
}