/**
 * Created by zt on 16/8/29.
 */
var router = require('koa-router')();
var db = require('../models/db');

router.get('/account/:temrinal_ip', async function (ctx, next) {
    ctx.body = await db.pay_account.findOne({where: {terminal: ctx.params.temrinal_ip, enabled: 1}});
});

router.post('/order', async function (ctx, next) {
    var order = await db.order.create(JSON.parse(ctx.request.body.order));
    ctx.body = order.order_id;
});

router.put('/order/status/:id', async function (ctx, next) {
    var order = await db.order.findById(ctx.params.id);
    order.status = ctx.request.body.status;
    order.callback_status = ctx.request.body.callback_status;
    ctx.body = await order.save();
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
