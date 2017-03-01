var data;
var difference;

workflow.currentstate = workflow[workflow.start];

function gettestdata (variable){
    self = this;
    $.get("trash/testdata.json", (d) => console.log(validate(d)) );

}

function validate(data){
    function insertday(j,d){
        var obj = {};
        obj['id'] = j;
        obj['inserted'] = false;
        $.each(d, function(index, value) {
            if(index != 'id' && index != 'date'){
                obj[index] = parseFloat(d[index]);
            }
        });
        return obj;
    }
    var dif;
    var day = 86400000;//msec
    var _data =[];
    for(i = 0,j=0 ; i < data.length-1; i++){
        _data.push(insertday(j,data[i]));
        j++;
        dif = Date.parse(data[i].date) - Date.parse(data[i+1].date);
        if(dif > day){
            for( z = 1; z < dif/day; z++ ){
                var obj = {};
                //obj['date'] = Date.parse(data[i].date);  /*надо прибавить день к предыдущему */
                // obj['date'] = new Date();
                // obj['date'] = obj['date'].getDate()+1
                obj['id'] = j;
                obj['inserted'] = true;
                //для каждого показателя ( (data[i+1] - data[i]) * i / (dif/day) + data[i]
                $.each(data[i], function(index, value) {
                    if(index != 'id' && index != 'date'){
                        obj[index] = ( ( (parseFloat(value) - parseFloat(data[i+1][index])) / (dif/day) ) * (dif/day - z) + parseFloat(data[i+1][index]) ); /// (dif/day)) + parseFloat(data[i][index]
                    }
                });
                _data.push(obj);
                j++;
            }
            console.log('difference is', dif/day, 'days', 'date is ', data[i].date);
        }else{ /*Разница в один день*/
            //console.log('difference is', dif/day, 'days', 'date is ', data[i].date);
        }  
    }
    _data.push(insertday(_data.length,data[data.length-1]));
    return _data;
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
    data = validate(_data);
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