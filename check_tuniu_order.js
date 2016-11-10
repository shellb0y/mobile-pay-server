/**
 * Created by zt on 16/11/10.
 */
var request = require('request-promise');
var db = require('./models/db');
require('./string_ex');
var logger = require('./logger');


var check_tuniu_order = function () {

};

async function order_cancel(orderid, account) {

    var options = {
        method: 'GET',
        url: `http://m.tuniu.com/userOrder/trainTicketOrderDetailAjax?data=%7B%22orderId%22%3A%22${orderid}%22%2C%22orderType%22%3A%2238%22%7D`,
        headers: {
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'cache-control': 'no-cache',
            cookie: `PageSwitch=2%2C1486178871; _tacau=MCxlMWJmYjc0NS1hN2JhLTdkMjgtZDAyMS02N2I1NmY2YjJmNzIs; _tacz2=taccsr%3D%28direct%29%7Ctacccn%3D%28none%29%7Ctaccmd%3D%28none%29%7Ctaccct%3D%28none%29%7Ctaccrt%3D%28none%29; _tacc=1;_taca=1478402930418.1478511685385.1478662782058.4; __utma=1.46010562.1478402931.1478511686.1478662793.4;__utmb=1.1.10.1478662793;__utmc=1; __utmz=1.1478402931.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none);: app_imei=${"".random_num(16)};  ov=2;tuniuuser_id=${account.userid}; TUNIUmuser=${account.sessionid};sessionId=MQ==; appVersion=9.0.0; tuniu_partner=MTU0NDcsMCwsOWIxMTFkNWY3NGQ1NmQ1NjdhNjEyZDQzYjEzYjVlYjI=;deviceType=1; SsoSession=${account.sessionid}; clientType=20; page_flag=;_tact=MzYzYTk1MzAtNjRiZC1hYWMxLWQwMDktZWM0MDJlOTcxZjQ0; _tacb=ZDIyYTBkN2YtMzAzZC0yOTlkLTc2MzQtZjI1MzJhYTExZjFh;`
        },
        json: true
    };

    resp = await request(options).catch((err)=> {
        console.log(`get touristId error`);
        console.log(err);
    });

    if (resp && resp.success) {
        var touristId = resp.data.touristsInfo[0].touristId;

        options = {
            method: 'GET',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'cache-control': 'no-cache',
            url: `http://m.tuniu.com/onlineBook/onlineBookTrain/trainApplyLossAjax?data=%7B%22orderId%22%3A${orderid}%2C%22orderType%22%3A38%2C%22touristIds%22%3A%22${touristId}%22%7D`,
            cookie: `PageSwitch=2%2C1486178871; _tacau=MCxlMWJmYjc0NS1hN2JhLTdkMjgtZDAyMS02N2I1NmY2YjJmNzIs; _tacz2=taccsr%3D%28direct%29%7Ctacccn%3D%28none%29%7Ctaccmd%3D%28none%29%7Ctaccct%3D%28none%29%7Ctaccrt%3D%28none%29; _tacc=1;_taca=1478402930418.1478511685385.1478662782058.4; __utma=1.46010562.1478402931.1478511686.1478662793.4;__utmb=1.1.10.1478662793;__utmc=1; __utmz=1.1478402931.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none);: app_imei=${"".random_num(16)};  ov=2;tuniuuser_id=${account.userid}; TUNIUmuser=${account.sessionid};sessionId=MQ==; appVersion=9.0.0; tuniu_partner=MTU0NDcsMCwsOWIxMTFkNWY3NGQ1NmQ1NjdhNjEyZDQzYjEzYjVlYjI=;deviceType=1; SsoSession=${account.sessionid}; clientType=20; page_flag=;_tact=MzYzYTk1MzAtNjRiZC1hYWMxLWQwMDktZWM0MDJlOTcxZjQ0; _tacb=ZDIyYTBkN2YtMzAzZC0yOTlkLTc2MzQtZjI1MzJhYTExZjFh;`,
            json: true
        };

        var resp = await request(options).catch((err)=> {
            console.log(`trainApplyLoss error`);
            console.log(err);
        });

        if (resp && resp.success) {
            options = {
                method: 'GET',
                url: `http://m.tuniu.com/onlineBook/onlineBookTrain/trainCancelOrderAjax?data=%7B%22orderId%22%3A${orderid}%2C%22orderType%22%3A38%2C%22touristIds%22%3A%22${touristId}%22%7D`,
                cookie: `PageSwitch=2%2C1486178871; _tacau=MCxlMWJmYjc0NS1hN2JhLTdkMjgtZDAyMS02N2I1NmY2YjJmNzIs; _tacz2=taccsr%3D%28direct%29%7Ctacccn%3D%28none%29%7Ctaccmd%3D%28none%29%7Ctaccct%3D%28none%29%7Ctaccrt%3D%28none%29; _tacc=1;_taca=1478402930418.1478511685385.1478662782058.4; __utma=1.46010562.1478402931.1478511686.1478662793.4;__utmb=1.1.10.1478662793;__utmc=1; __utmz=1.1478402931.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none);: app_imei=${"".random_num(16)};  ov=2;tuniuuser_id=${account.userid}; TUNIUmuser=${account.sessionid};sessionId=MQ==; appVersion=9.0.0; tuniu_partner=MTU0NDcsMCwsOWIxMTFkNWY3NGQ1NmQ1NjdhNjEyZDQzYjEzYjVlYjI=;deviceType=1; SsoSession=${account.sessionid}; clientType=20; page_flag=;_tact=MzYzYTk1MzAtNjRiZC1hYWMxLWQwMDktZWM0MDJlOTcxZjQ0; _tacb=ZDIyYTBkN2YtMzAzZC0yOTlkLTc2MzQtZjI1MzJhYTExZjFh;`,
                json: true
            };


            resp = await request(options).catch((err)=> {
                console.log(`CancelOrder error`);
                console.log(err);
            });

            if (resp && resp.success) {
                console.log(`CancelOrder success`);
            }else{
                console.log(`CancelOrder faild,response:${resp}`);
            }
        } else {
            console.log(`trainApplyLoss faild,response:${resp}`);
        }
    } else {
        console.log(`get touristId faild,response:${resp}`);
    }
}

check_tuniu_order.prototype.order_cancel = order_cancel;

check_tuniu_order.prototype.exec = function () {
    setInterval(()=> {
        logger.i('check tuniu starting...');
        db.ticket_order.findAll({where: {_status: '支付成功'}, order: 'order_id'}).then((orders)=> {
            orders.forEach(async (o)=> {
                logger.i(`get order ${o.order_id}`);

                var pay = JSON.parse(o.pay);
                var account = JSON.parse(pay.account);

                //account = await db.sequelize.query(`select * from account where json_extract(_data,'$.username')='${account.username}'`,
                //    {model: db.account});
                //if (account) {
                //    account = JSON.parse(account[0]._data);
                //}

                var options = {
                    method: 'GET',
                    url: `http://m.tuniu.com/userOrder/trainTicketOrderDetailAjax?data=%7B%22orderId%22%3A%22${pay.bizOrderId}%22%2C%22orderType%22%3A%2238%22%7D`,
                    headers: {
                        'Accept': '*/*',
                        'X-Requested-With': 'XMLHttpRequest',
                        'cache-control': 'no-cache',
                        cookie: `PageSwitch=2%2C1486178871; _tacau=MCxlMWJmYjc0NS1hN2JhLTdkMjgtZDAyMS02N2I1NmY2YjJmNzIs; _tacz2=taccsr%3D%28direct%29%7Ctacccn%3D%28none%29%7Ctaccmd%3D%28none%29%7Ctaccct%3D%28none%29%7Ctaccrt%3D%28none%29; _tacc=1;_taca=1478402930418.1478511685385.1478662782058.4; __utma=1.46010562.1478402931.1478511686.1478662793.4;__utmb=1.1.10.1478662793;__utmc=1; __utmz=1.1478402931.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none);: app_imei=${"".random_num(16)};  ov=2;tuniuuser_id=${account.userid}; TUNIUmuser=${account.sessionid};sessionId=MQ==; appVersion=9.0.0; tuniu_partner=MTU0NDcsMCwsOWIxMTFkNWY3NGQ1NmQ1NjdhNjEyZDQzYjEzYjVlYjI=;deviceType=1; SsoSession=${account.sessionid}; clientType=20; page_flag=;_tact=MzYzYTk1MzAtNjRiZC1hYWMxLWQwMDktZWM0MDJlOTcxZjQ0; _tacb=ZDIyYTBkN2YtMzAzZC0yOTlkLTc2MzQtZjI1MzJhYTExZjFh;`
                    },
                    json: true
                };

                //var response = await request.get(options).catch((err)=> {
                //    logger.e(`GET ${o.order_id},${pay.bizOrderId} response faild`);
                //    logger.e(err);
                //    return false;
                //});
                //
                //if(response.success){
                //    logger.d(`GET ${o.order_id},${pay.bizOrderId} response:\n${JSON.stringify(response)}`);
                //    console.log(response.data.payStatusName);
                //}else{
                //    logger.e(`${o.order_id},${pay.bizOrderId} status update faild.response:\n${JSON.stringify(response)}`);
                //}

                //console.log(options);

                request.get(options).then((response)=> {
                    logger.d(`GET ${o.order_id},${pay.bizOrderId} response:\n${JSON.stringify(response)}`);
                    if (response.success) {
                        o._status = response.data.payStatusName;
                        o.save().then((d)=> {
                            logger.i(`${o.order_id},${pay.bizOrderId} status update success`);
                        }).catch((err)=> {
                            logger.e(`${o.order_id},${pay.bizOrderId} status update faild.\n${err}`);
                        });
                    } else {
                        logger.e(`GET ${o.order_id},${pay.bizOrderId} response faild`);
                    }
                }).catch((err)=> {
                    logger.e(`GET ${o.order_id},${pay.bizOrderId} response error`);
                    logger.e(err);
                });

            });
        });

        db.ticket_order.findAll({
            where: {
                _status: ['已付款完成', '未入库'], check_partner_num: {$lte: 6}
            }, order: 'check_partner_num,order_id'
        }).then((orders)=> {
            orders.forEach((o)=> {
                var pay = JSON.parse(o.pay);
                var options = {
                    method: 'GET',
                    url: `http://op.yikao666.cn/JDTrain/submitOrder?SubOrderid=${pay.partner_order_id}&jqueryc=1478679215942`,
                    json: true
                };

                request(options).then((response)=> {
                    logger.d(`GET ${o.order_id},${pay.partner_order_id} response:\n${JSON.stringify(response)}`);
                    if (response.statusCode) {
                        o._status = '已完成';
                    } else {
                        o._status = '未入库';
                        o.check_partner_num = o.check_partner_num + 1;
                    }

                    o.save().then((d)=> {
                        logger.i(`${o.order_id},${pay.partner_order_id} status update success`);
                    }).catch((err)=> {
                        logger.e(`${o.order_id},${pay.partner_order_id} status update faild.\n${err}`);
                    });
                }).catch((err)=> {
                    logger.e(`CHECK partner ${o.order_id},${pay.partner_order_id} response error`);
                    logger.e(err);
                });
            });
        });
    }, 30 * 1000);

};


module.exports = check_tuniu_order;
