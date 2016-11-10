/**
 * Created by zt on 16/8/29.
 */
var router = require('koa-router')();
var db = require('../models/db');
var mutex = require('node-mutex')({host: '120.26.213.143'});
var request = require('request');

router.get('/payaccount', async function (ctx, next) {
    ctx.body = await db.pay_account.findOne({where: {enabled: 1}});
});

router.put('/payaccount/:id', async function (ctx, next) {
    var account = await db.pay_account.findById(ctx.params.id);
    console.log(ctx.request.body.price);
    if (account) {
        account.today_pay_count = account.today_pay_count + 1;
        account.balance = account.balance - ctx.request.body.price;
        account.last_pay_time = new Date();
        await account.save();
        ctx.body = 1;
    } else {
        ctx.body = 0;
    }
});

router.get('/account/:source', async function (ctx, next) {
    //var account = await db.account.findOne({
    //    where: {_source: ctx.params.source,get_time:{$lt:6}},
    //    order: 'get_count_today,get_time',
    //    limit: 1
    //});

    var account = await db.account.findById(4);
    account.get_time = new Date();
    account.get_count_today = account.get_count_today + 1;
    account.save();

    if (account)
        ctx.body = {id: account.account_id, data: account._data};
    else {
        ctx.status = 204;
    }
});

router.put('/account/:id', async function (ctx, next) {
    var account = await db.account.findById(ctx.params.id);
    account._data = ctx.request.body;
    account.get_time = new Date();
    account.get_count_today = account.get_count_today + 1;
    await account.save();

    ctx.body = 1;
});

//router.get('/order/tuniu', async function (ctx, next) {
//    var promise = new Promise((resovle, reject)=> {
//        request('http://op.yikao666.cn/JDTrainOpen/getOrderForTN', function (error, response, body) {
//            if (!error && response.statusCode == 200) {
//                resovle(body);
//            } else {
//                reject(response.body);
//            }
//        });
//    });
//
//    var respose = await promise.catch((e)=> {
//        throw new Error(e);
//    });
//
//
//    ctx.body = respose;
//
//
//});

//var promise_test = new Promise((resolve, reject)=> {
//    setTimeout(()=> {
//        reject(2);
//    }, 4000);
//});

router.get('/order/pay', async function (ctx, next) {
    //var err;
    //var test = await promise_test.catch((e)=> {
    //    console.log('mutex error');
    //    console.log(e);
    //
    //    if (e instanceof Error)
    //        throw e;
    //    else
    //        throw new Error(e);
    //});

    //if (err) {
    //    throw Error('mutex error:'+err);
    //}
    //else {
    //    ctx.body = test;
    //}

    //var unlock = await mutex.lock('key');

    //.catch((e)=> {
    //    console.log('mutex error');
    //    console.log(e);
    //
    //    if (e instanceof Error)
    //        throw e;
    //    else
    //        throw new Error(e);
    //});

    var order = await db.ticket_order.findOne({where: {_status: '下单成功'}, limit: 1, order: 'created'});
    //order._status = '正在支付';
    //await order.save();

    if (order) {
        var data = JSON.parse(order.pay);
        data['orderId'] = order.order_id;
        ctx.body = data;
    }
    else
        ctx.status = 204;

    //unlock();
});


router.post('/order', async function (ctx, next) {
    console.log(ctx.request.body);
    var order = await db.ticket_order.create({check_partner_num:0,_data: ctx.request.body, _status: '正在下单', created: new Date()});
    ctx.body = order.order_id
});

//router.put('/order/status/:id', async function (ctx, next) {
//    var order = await db.ticket_order.findById(ctx.params.id);
//    order._status = ctx.request.body.status;
//    order.modified = new Date();
//    await order.save();
//    ctx.body = 1;
//});

router.put('/order/status/:id/:status', async function (ctx, next) {
    var order = await db.ticket_order.findById(ctx.params.id);
    if (order) {
        order._status = decodeURIComponent(ctx.params.status);

        if (order._status == '下单失败')
            order.ext = ctx.request.body;
        else if (order._status == '下单成功')
            order.pay = ctx.request.body;

        await order.save();
    } else {
        ctx.body = 0;
    }
    ctx.body = 1;
});

router.put('/order/callback_status/:id/:status', async function (ctx, next) {
    var order = await db.order.findById(ctx.params.id);
    order.callback_status = ctx.params.status;
    ctx.body = await order.save();
});

module.exports = router;
