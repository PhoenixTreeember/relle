/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var refresh, timer;
var str_url = "http://" + window.location.hostname + "/api/";

function setData(data) {
    data = $.parseJSON(data);
    if (data["status"] > 0) {
        clearInterval(timer);
        clearInterval(refresh);
        loadLab(data);
    } else {
        var intval = parseInt(data['interval']);
        intval = (intval >= 1 ) ? intval : 1;
        //$("#exp").html("<p> Proxima requisicao em " + intval + " segundos </p>");
        refresh = setInterval(Refresh, intval * 1000);
    }
}


function setDataRunning(data) {
    // data = $.parseJSON(data);   
}

function Refresh() {
    var dataout = { 'pass': $('meta[name=csrf-token]').attr('content'), 'exp_id': exp_id, 'exec_time': duration};
    clearInterval(refresh);
    $.ajax({
        url: str_url+"wait",
        data: dataout,
        type: "POST",
        timeout: 60000, //1 minuto
        success: function (data) {
            setData(data);
        }
    });
}

function LeaveExperiment() {
    clearInterval(refresh);
    clearInterval(timer);
    
    var dataout = {'pass': $('meta[name=csrf-token]').attr('content'), exp_id: exp_id};
    
    $.ajax({
        url: str_url+"delete",
        data: dataout,
        type: "POST",
        timeout: 60000,
        success: function (data) {
            $('#exp').html("<p>Experiência finalizada com "+data+ "</p> <p>Redirecionando para a página inicial ...</p> <br>");// Isto limpa a pagina
             $("#btnLeave").off('click');                                                
             setTimeout(function(){
                 window.location.href = "http://" + window.location.hostname;
             },1000);

        }
    });
    

}


function RefreshTimeAlive() {

    var dataout = {'pass': $('meta[name=csrf-token]').attr('content'), exp_id: exp_id};

    $.ajax({
        url: str_url+"refresh",
        data: dataout,
        type: "POST",
        timeout: 60000,
        success: function (data) {
            setDataRunning(data);
        }
    });
}


function TimerMinus() {
    var soma = parseInt($("#min").html()) * 60 + parseInt($("#seg").html());
    soma = (soma - 1) / 60;

    if (soma > 0) {
        $("#min").html(parseInt(soma));
        var seg = Math.round((soma - parseInt(soma)) * 60);
        var zero = "";
        if (seg < 10) {
            zero = "0";
        }
        $("#seg").html(zero + seg);
    } else {
        clearInterval(timer);
    }
}


