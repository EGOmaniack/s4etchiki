var data;
var difference;

function firstdraw(){
    if(workflow.start == 'electrik'){
        svg_canvas(difference, "light_day", "light_night");
        workflow.currentstate = workflow.electrik;
    }
    buttonsUpdate();
}
function drow(){
    graphic();
    if(workflow.currentstate.name == 'electrik'){
        svg_canvas(difference, "light_day", "light_night");
    }
    if(workflow.currentstate.name == 'water_kit'){
        svg_canvas(difference, "kichen_water_c", "kichen_water_h");
    }
    if(workflow.currentstate.name == 'water_bath'){
        svg_canvas(difference, "bath_water_c", "bath_water_h");
    }
    buttonsUpdate();
}
function buttonsUpdate(){
        if(workflow.currentstate.state.go_next == "" ){ $('#nextgr').addClass('hide'); }else{ $('#nextgr').removeClass('hide');}
        if(workflow.currentstate.state.go_back == "" ){ $('#prewgr').addClass('hide'); }else{ $('#prewgr').removeClass('hide');}
}

$.getJSON(workflow.path + "?init", function (_data) {
    data = _data; 
    difference = get_difference2(data);
    firstdraw();
});

// $.getJSON("/ajax/get.php", function (data) {
//                 var difference = get_difference2(data);
//                 //console.log(difference);
//                 svg_canvas(difference, "light_day", "light_night");
//                 svg_canvas(difference, "kichen_water_c", "kichen_water_h");
//                 svg_canvas(difference, "bath_water_c", "bath_water_h");
//});

function graphic () {
                $("#content").html('');
                $("#title").html('Графики');
                $("#content").append('<a class="btn small next" id="nextgr">next<a><a class="btn small back" id="prewgr">back<a>');
                $("#content").append('<h5 class="title" id="graphid">Электричество</h5>');
            }

graphic();

$('#nextgr').click(function(){
    if(workflow.currentstate.state.go_next == 'water_kit'){
        $('graphid').html('Вода кухня');
        workflow.currentstate = workflow.water_kit;
    }
    if(workflow.currentstate.state.go_next == 'water_bath'){
        $('graphid').html('Вода ванна');
        workflow.currentstate = workflow.water_bath;
    }
    drow();
});

$('#prewgr').click(function(){
    alert(111);
    if(workflow.currentstate.state.go_back == 'water_kit'){
        $('graphid').html('Вода кухня');
        workflow.currentstate = workflow.electrik;
    }
    if(workflow.currentstate.state.go_back == 'water_bath'){
        $('graphid').html('Вода ванна');
        workflow.currentstate = workflow.water_kit;
    }
    drow();
});