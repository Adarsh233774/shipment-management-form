/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL ='/api/irl';
var jpdbIML ='/api/iml';
var DBName ='DELIVERY-DB';
var RelationName ='SHIPMENT-TABLE';
var connToken ='90931289|-31949327943897364|90961126';
$("#shipno").focus();

function saveRecNo2LS(jsonObj) {
    var tvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', tvData.rec_no);
    
}

function getshipnoAsJsonObj() {
    var shipno = $('#shipno').val();
    var jsonStr = {
        id: shipno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#desc").val(record.desc);
    $("#source").val(record.source); 
    $("#des").val(record.des);
    $("#shipdate").val(record.shipdate);
    $("#deldate").val(record.deldateion);
}

function resetForm() {
    $("#emoid").val("");
    $("#desc").val("");
    $("#source").val("");
    $("#des").val("");
    $("#shipdate").val("");
    $("#deldate").val("");
    $("#shipno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#shipno").focus();
}

function validateData() {
    var shipno, desc, source, des, shipdate, deldate;
    shipno = $("#shipno").val();
    desc = $("#desc").valueOf();
    source = $("#source").val();
    des = $("#des").val();
    shipdate = $("#shipdate").val();
    deldate = $("#deldate").val();
    if (shipno === '') {
        alert('Eshipment no missing');
        $("#shipno").focus();
        return "";
    }
    if (desc === '') {
        alert('description missing');
        $("#desc").focus();
        return "";
    }
    if (source === '') {
        alert(' source missing');
        $("#source").focus();
        return "";
    }
    if (des === '') {
        alert('destination missing');
        $("#des").focus();
        return "";
    }
    if (shipdate === '') {
        alert('shipdate missing');
        $("#shipdate").focus();
        return "";
    }
    if (deldate === '') {
        alert('deldate missing');
        $("#deldate").focus();
        return "";
    }
    var jsonStrObj = {
        id: shipno,
        desc: desc,
        source: source,
        des: des,
        shipdate: shipdate,
        deldate: deldate
    };
    return JSON.stringify(jsonStrObj);
}



function getship() {
    var shipnoJsonObj = getshipnoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,DBName,RelationName,shipnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#desc").focus();
    } else if (resJsonObj.status === 200) {
        $("#shipno").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#desc").focus();
    }
}


function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,DBName,RelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#shipno").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,DBName,RelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#shipno").focus();
}








