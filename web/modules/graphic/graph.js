var data;
var difference;

workflow.currentstate = workflow[workflow.start];

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