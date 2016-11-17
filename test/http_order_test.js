/**
 * Created by zt on 16/11/1.
 */
var request = require('request');
var db = require('../models/db');

//request('http://op.yikao666.cn/JDTrainOpen/getOrderForTN', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//        console.log(body); // Show the HTML for the Google homepage.
//    }
//});

//var options = { method: 'GET',
//    url: 'http://m.tuniu.com/userOrder/trainTicketOrderDetailAjax?data=%7B%22orderId%22%3A%221005223917%22%2C%22orderType%22%3A%2238%22%7D',
//    headers:
//    {   'cache-control': 'no-cache',
//        cookie: 'PageSwitch=2%2C1486178871; _tacau=MCxlMWJmYjc0NS1hN2JhLTdkMjgtZDAyMS02N2I1NmY2YjJmNzIs; _tacz2=taccsr%3D%28direct%29%7Ctacccn%3D%28none%29%7Ctaccmd%3D%28none%29%7Ctaccct%3D%28none%29%7Ctaccrt%3D%28none%29; _tacc=1; _taca=1478402930418.1478511685385.1478662782058.4; __utma=1.46010562.1478402931.1478511686.1478662793.4;__utmb=1.1.10.1478662793; __utmc=1; __utmz=1.1478402931.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none);: app_imei=863175026618021;  ov=2; ' +
//        'tuniuuser_id=53652991; tuniuuser_citycode=MTUwMg%3D%3D; TUNIUmuser=8a28a3989940bcc5e39f4b7bd957d61c; sessionId=MQ==; appVersion=9.0.0; tuniu_partner=MTU0NDcsMCwsOWIxMTFkNWY3NGQ1NmQ1NjdhNjEyZDQzYjEzYjVlYjI=; deviceType=1; SsoSession=8a28a3989940bcc5e39f4b7bd957d61c; clientType=20; page_flag=; _tact=MzYzYTk1MzAtNjRiZC1hYWMxLWQwMDktZWM0MDJlOTcxZjQ0; _tacb=ZDIyYTBkN2YtMzAzZC0yOTlkLTc2MzQtZjI1MzJhYTExZjFh;' }
//    };
//
//request(options, function (error, response, body) {
//    if (error) throw new Error(error);
//
//    console.log(body);
//});

//var check_tuniu_order= require('../check_tuniu_order');
//var checkTuniuOrder= new check_tuniu_order();
//
//checkTuniuOrder.order_cancel(1005249190,{"username": "15728532201", "userid": 53652883, "sessionid": "629fd31db26f60cf7c9f1b02f670faa9", "password": "a256683", "userId": 53652883});
