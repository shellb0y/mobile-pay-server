/**
 * Created by zt on 16/12/26.
 */
var router = require('koa-router')();
var redis = require('../redis');

var PUFABANK_PATTERN = /银联在线支付验证码：(\d{6})，金额(\d+\.\d+)元RMB，商户：(.+)，订单尾号：(\d{6})，请勿泄露！【浦发银行】/;

router.post('/', async(ctx, next)=> {
    //var str = "银联在线支付验证码：747687，金额189.50元RMB，商户：北京途牛国际旅行社有，订单尾号：003800，请勿泄露！【浦发银行】";
    var str = ctx.request.body.sms;
    if(!str){
        ctx.body = {'success': 0};
        return;
    }

    var group = str.match(PUFABANK_PATTERN);
    if (group.length < 4) {
        ctx.body = {'success': 0};
        return;
    }

    var data = {
        'terminal':ctx.request.body.terminal,
        'source': group[0],
        'code': group[1],
        'amount': group[2],
        'target': group[3],
        'id': group[4],
        'bank': '浦发银行'
    };

    console.log(data);

    var redis_client = redis.createClient();
    var key = `union_sms:id:${data.id}`;
    redis_client.hmset(key, data);
    redis_client.expire(key, 5 * 60);
    redis_client.quit();

    ctx.body = {'success': 1};
});

module.exports = router;