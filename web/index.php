<?php
include_once 'startmanager.php';
//генерируем число
$sek = strtotime("now");
$js = '<script type="text/javascript" src = "js/main.js?'.$sek.'" ></script>';
$css = '<link rel="stylesheet" href="css/main.css?'.$sek.'">';
$castomcss;
$castomjs;
?>
<!DOCTYPE>
<html>
    <head>
        <script type="text/javascript" src = "js/jquery.min.js" ></script>
        <script src="https://d3js.org/d3.v4.min.js"></script>
        <?=$css?>
        <?=$castomcss?>
        <title>Счетчики</title>
    </head>
    <body>
        
        <h2>Контроль показателей</h2>
        <div class="main">
        <div class="menu">
            <a class="btn s4et" href="/?flow=s4etchiki">Перейти к счетчикам</a>
            <a class="btn s4et" href="/?flow=graphic">Перейти к графикам</a>
            <a class="btn s4et" href="/?flow=changestate">Корректировка данных</a>
            <a class="btn back" href="/">Назад</a>
            
        </div>
        <h2 id='title'></h2>
        <div id='content'></div>
        </div>
        <?=$js?>
        <?=$castomjs?>
    </body>
</html>