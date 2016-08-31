/**
 * Created by zt on 16/8/29.
 */
var router = require('koa-router')();
var db = require('../models/db');

router.get('/account/:temrinal_ip', async function (ctx, next) {
    ctx.body = await db.pay_account.findOne({where: {terminal: ctx.params.temrinal_ip, enabled: 1}});
});

module.exports = router;
