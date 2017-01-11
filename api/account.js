/**
 * Created by zt on 16/12/9.
 */
var router = require('koa-router')();
var db = require('../models/db');
require('../date_ex');

router.post('/tuniu/cookie', async function (ctx, next) {
    console.log(new Date().format('yyyy-MM-dd hh:mm:ss') + '');
    var account = await db.sequelize.query(`select * from account where _data->"$.username"='${ctx.request.body.username}'`,
        {type: db.sequelize.QueryTypes.SELECT/*,model:db.ticket_order*/});

    if (account) {
        db.account.update({
            cookie: ctx.request.body.cookie,
            _status: ctx.request.body.status,
            modified: new Date()
        }, {where: {account_id: account[0].account_id}});
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