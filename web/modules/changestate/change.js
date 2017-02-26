            function changedata (){
                $("#content").html('');
                $.get("/ajax/lastdata.php", function (data) {
                    $("#content").html(data);
                });
                $("#title").val('Предыдущие данные');
            }
changedata();