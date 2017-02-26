var data;
var difference;

function draw(){
    if(workflow.start == 'electrik'){
        svg_canvas(difference, "light_day", "light_night");
    }
}


$.getJSON(workflow.path + "?init", function (_data) {
    data = _data; 
    difference = get_difference2(data);
    draw();
});

// $.getJSON("/ajax/get.php", function (data) {
//                 var difference = get_difference2(data);
//                 //console.log(difference);
//                 svg_canvas(difference, "light_day", "light_night");
//                 svg_canvas(difference, "kichen_water_c", "kichen_water_h");
//                 svg_canvas(difference, "bath_water_c", "bath_water_h");
//                 });

function graphic () {
                $("#content").html('');
                $("#title").val('Графики');
                $("svg").append('<a class="btn next">next<a><a class="btn back">back<a>');
                
            }

graphic();