var data;
var difference;

workflow.currentstate = workflow[workflow.start];

function gettestdata (variable){
    self = this;
    $.get("trash/testdata.json", (d) => console.log(validate(d)) );

}

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

function validate(data){
    var dif; /*Разница в милисекундах между записями из БД*/
    var day = 86400000; /*msec*/
    var _data =[]; /*Будем заполнять эту переменную*/

    for(i = 0,j=0 ; i < data.length-1; i++){
        _data.push(insertday(j,data[i])); /*Каждый новый день записываем*/
        j++;
        dif = Date.parse(data[i].date) - Date.parse(data[i+1].date); /*Вычисляем сколько времени между записями*/
        if(dif > day) {

            for( z = 1; z < dif/day; z++ ) {

                var obj = {};
                /* Надо как-то заполнять и дату в пропущеных днях */
                //obj['date'] = Date.parse(data[i].date);  /*надо прибавить день к предыдущему */
                // obj['date'] = new Date();
                // obj['date'] = obj['date'].getDate()+1
                obj['id'] = j;
                obj['inserted'] = true; /**помечаем сгенерированные данные */

                $.each(data[i], function(index, value) {    /**Перебираем все показатели в записи кроме id и date */
                    if(index != 'id' && index != 'date'){
                        obj[index] = ( ( (parseFloat(value) - parseFloat(data[i+1][index])) / (dif/day) ) * (dif/day - z) + parseFloat(data[i+1][index]) ); /// (dif/day)) + parseFloat(data[i][index]
                        /**генерируем недостающие показатели 
                         * для каждого показателя ( (data[i+1] - data[i]) * i / (dif/day) + data[i]
                        */
                    }
                });

                _data.push(obj); /**Записываем полученное */
                j++;
            }
        }
    }
    /**В конце записываем последнюю часть данных, которую не с чем было сравнивать */
    _data.push(insertday(_data.length,data[data.length-1]));
    return _data;
}

function draw(){/**Отрисовка графика */
    $('#graphid').html(workflow.currentstate.readable.val);
    $('svg').remove();
    svg_canvas(difference, workflow.currentstate['graphs']['graph1'],
        workflow.currentstate['graphs']['graph2'])
    buttonsUpdate();
}

function buttonsUpdate(){/**Прячем кнопки если действие невозможно */
    if(!('go_next' in workflow.currentstate.state)){ $('#nextgr').addClass('hide'); }else{ $('#nextgr').removeClass('hide');}
    if(!('go_back' in workflow.currentstate.state)){ $('#prewgr').addClass('hide'); }else{ $('#prewgr').removeClass('hide');}
}

$.getJSON(workflow.path + "?init", function (_data) {
    /**Инициализируем модуль. Возвращаются последние 31 запись из БД*/
    data = validate(_data); /** Проверяем все ли дни на месте, если нет, генерируем недостающие данные */
    difference = get_difference2(data); /**Вычисляем разницу между показателями n дня и n-1 дня  */
    draw(); /**Запускаем отрисовку графиков */
});

function graphic () { /** При загрузке страницы очищаем контент и заполняем своим заголовком*/
    $("#content").html('');
    $("#title").html('Графики');
    $("#content").append('<h5 class="title" id="graphid"></h5>');
    $("#content").append('<a class="btn small next" id="nextgr">next<a>'
                        +'<a class="btn small back" id="prewgr">back<a>');
}

graphic();

$('#nextgr').click(function(){ /**Обработчик кнопки вперед */
    workflow.currentstate = workflow[workflow.currentstate.state.go_next];
    draw();
});

$('#prewgr').click(function(){/**Обработчик кнопки назад */
    workflow.currentstate = workflow[workflow.currentstate.state.go_back];
    draw();
});