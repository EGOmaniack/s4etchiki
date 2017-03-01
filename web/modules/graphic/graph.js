var data;
var difference;

workflow.currentstate = workflow[workflow.start];
validate([
    {'date':'2017-08-28', 'id':'0',"light_day": "6148.01"},
    {'date':'2017-08-25', 'id': '1',"light_day": "6100"},
    {'date':'2017-08-24', 'id': '1',"light_day": "6099"}
]);

function validate(data){
    var dif;
    for(i = 0 ; i < data.length-1; i++){
        dif = Date.parse(data[i].date) - Date.parse(data[i+1].date);
        if(dif > 86400000){console.log('difference is', dif/86400000, 'days');}
    }
}

function draw(){
    $('#graphid').html(workflow.currentstate.readable.val);
    $('svg').remove();
    svg_canvas(difference, workflow.currentstate['graphs']['graph1'],
        workflow.currentstate['graphs']['graph2'])
    buttonsUpdate();
}

function buttonsUpdate(){
    if(!('go_next' in workflow.currentstate.state)){ $('#nextgr').addClass('hide'); }else{ $('#nextgr').removeClass('hide');}
    if(!('go_back' in workflow.currentstate.state)){ $('#prewgr').addClass('hide'); }else{ $('#prewgr').removeClass('hide');}
}

$.getJSON(workflow.path + "?init", function (_data) {
    data = _data; 
    difference = get_difference2(data);
    draw();
});

function graphic () {
    $("#content").html('');
    $("#title").html('Графики');
    $("#content").append('<h5 class="title" id="graphid"></h5>');
    $("#content").append('<a class="btn small next" id="nextgr">next<a>'
                        +'<a class="btn small back" id="prewgr">back<a>');
}

graphic();

$('#nextgr').click(function(){
    workflow.currentstate = workflow[workflow.currentstate.state.go_next];
    draw();
});

$('#prewgr').click(function(){
    workflow.currentstate = workflow[workflow.currentstate.state.go_back];
    draw();
});