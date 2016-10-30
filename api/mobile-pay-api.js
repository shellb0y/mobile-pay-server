/**
 * Created by zt on 16/8/29.
 */
var router = require('koa-router')();
var db = require('../models/db');
var mutex = require('node-mutex')({host: '120.26.213.143'});

router.get('/account/:temrinal_ip', async function (ctx, next) {
    ctx.body = await db.pay_account.findOne({where: {terminal: ctx.params.temrinal_ip, enabled: 1}});
});

//var promise_test = new Promise((resolve, reject)=> {
//    setTimeout(()=> {
//        reject(2);
//    }, 4000);
//});

router.get('/order', async function (ctx, next) {
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

    var unlock = await mutex.lock('key').catch((e)=> {
        console.log('mutex error');
        console.log(e);

        if (e instanceof Error)
            throw e;
        else
            throw new Error(e);
    });

    var order = await db.ticket_order.findOne({where: {_status: '待支付'}, limit: 1, order: 'created'});
    order._status = '正在支付';
    order._version = order._version + 1;
    await order.save();
    ctx.body = order.order_id;

    unlock();
});

router.post('/order', async function (ctx, next) {
    var order = await db.order.create(JSON.parse(ctx.request.body.order));
    ctx.body = order.order_id;
});

router.put('/order/status/:id', async function (ctx, next) {
    var order = await db.order.findById(ctx.params.id);
    order.status = ctx.request.body.status;
    order.callback_status = ctx.request.body.callback_status;
    order.modified = new Date();
    await order.save();
    ctx.body = 1;
});

router.put('/order/status/:id/:status', async function (ctx, next) {
    var order = await db.order.findById(ctx.params.id);
    order.status = ctx.params.status;
    ctx.body = await order.save();
});

router.put('/order/callback_status/:id/:status', async function (ctx, next) {
    var order = await db.order.findById(ctx.params.id);
    order.callback_status = ctx.params.status;
    ctx.body = await order.save();
});

module.exports = router;
