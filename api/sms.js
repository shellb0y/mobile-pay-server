/**
 * Created by zt on 16/12/26.
 */
const router = require('koa-router')();
const Redis = require('../redis');
const smsHandler = require('../sms_handler');

router.post('/', async(ctx, next) => {
    let sms = ctx.request.body.sms;
    if (!sms) {
        ctx.body = {'success': 0};
        return;
    }

    let data = smsHandler.exec(sms);
    data.terminal = ctx.request.body.terminal;

    console.log(data);

    let key = `union_sms:id:${data.id}`;
    Redis.server.pipeline()
        .hmset(key, data)
        .expire(key, 5 * 60)
        .exec()
        .then(data => {
            console.log('send to redis success');
        }).catch(err => {
        throw err;
    });

    ctx.body = {'success': 1};
});

router.get('/:id', async(ctx, next) => {
    console.log(ctx.params.id);
    let data = await Redis.server.hgetall(`union_sms:id:${ctx.params.id}`).catch(err => {
        throw err;
    });

    if (data.code) {
        ctx.body = {'success': 1, 'code': data.code};
    } else {
        ctx.body = {'success': 0};
    }
});


module.exports = router;