/**
 * Created by zt on 16/12/9.
 */
var router = require('koa-router')();
var db = require('../models/db');

router.post('/tuniu/cookie/:mobile', async function (ctx, next) {
    var account = await db.sequelize.query(`select * from account where _data->"$.username"='${ctx.params.mobile}'`,
        {type: db.sequelize.QueryTypes.SELECT/*,model:db.ticket_order*/});
    if (account) {
        db.account.update({cookie: ctx.request.body.cookie}, {where: {account_id: account[0].account_id}});
        ctx.body = 'success';
    }
    else {
        ctx.body = 'faild';

    }
});

//router.get('/tuniu', async function (ctx, next) {
//    var account = await db.account.findOne({
//        where: {
//            $or: [
//                {cookie: ''},
//                {cookie: null}]
//        }
//    });
//    if (account) {
//        ctx.body = account._data;
//    } else {
//        ctx.body = '{}';
//    }
//});


module.exports = router;