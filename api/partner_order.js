/**
 * Created by zt on 16/12/7.
 */
var router = require('koa-router')();
var db = require('../models/db');
var crypto = require('crypto');

var debug = 1;

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

/**
 * @api {post} /order 提交订单
 * @apiName PostOrder
 * @apiVersion 1.0.0
 * @apiGroup Order
 *
 * @apiDescription 提交订单,注意签名时callback需要进行url编码
 *
 * @apiParam {String}   id            合作伙伴订单号
 * @apiParam {String}   mobile        待充值的手机号
 * @apiParam {String}   amount        金额,暂时只支持100元的话费充值
 * @apiParam {String}   partner       合作伙伴名称
 * @apiParam {String}   callback      回调地址
 * @apiParam {Number}   t             时间戳
 * @apiParam {String}   sign          签名,按参数字母升序将值连接成一个字符串并用md5加密,md5({amount}{urlencode(callback)}{id}{mobile}{partner}{secret(密钥)}{t})
 *
 * @apiExample Example usage:
 * curl -d "amount={amount}&callback={urlencode(callback)}&id={id}&mobile={mobile}&partner={partner}&t={t}&sign={sign}"
 * "http://115.28.102.142:8000/v1/api/order"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data":{"order_id":"10000"}
 *     }
 *
 * @apiError DATA_INVALID   parameter error.
 * @apiError SIGN_INVALID   signature verification failed.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "success":false,
 *       "error": {"code":"DATA_INVALID","message":"{parameter error}"}
 *     }
 *
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "success":false,
 *       "error": {"code":"SIGN_INVALID","message":"signature verification failed."}
 *     }
 * */
router.post('/order', async function (ctx, next) {
    var sign = ctx.request.body.sign;
    var t = ctx.request.body.t;
    var id = ctx.request.body.id;
    var amount = ctx.request.body.amount;
    var callback = ctx.request.body.callback;
    var mobile = ctx.request.body.mobile;
    var partner = ctx.request.body.partner;
    var secret = 'y(T|D/g6';
    var ret = {};

    if (!sign) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter sign'}};
        ctx.body = ret;
        return;
    } else if (!t) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter t'}};
        ctx.body = ret;
        return;
    } else if (!id) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter id'}};
        ctx.body = ret;
        return;
    } else if (!mobile) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter mobile'}};
        ctx.body = ret;
        return;
    } else if (!partner) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter partner'}};
        ctx.body = ret;
        return;
    }
    else if (!amount) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter amount'}};
        ctx.body = ret;
        return;
    }
    else if (!callback) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter callback'}};
        ctx.body = ret;
        return;
    }
    else if (!secret) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'partner invalid'}};
        ctx.body = ret;
        return;
    }

    if(!(parseFloat(amount) == 100)){
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'amount not support'}};
        ctx.body = ret;
        return;
    }

    var data = amount + id + callback + mobile + partner + secret + t;
    var _sign = md5(data);

    if (_sign == sign) {
        ctx.status = 202;
        ctx.status = 202;
        ret = {'success': true, 'data': {'order_id': 10000}};
    }
    else {
        ctx.status = 403;
        ret = {'success': false, 'error': {'code': 'SIGN_INVALID', 'message': 'signature verification failed'}}
    }

    if (debug)
        ret.debug = {'target': data, 'sign': _sign};


    ctx.body = ret;
});

/**
 * @api {get} /order/status 获取订单状态
 * @apiName GetOrderStatus
 * @apiVersion 1.0.0
 * @apiGroup Order
 *
 * @apiDescription 获取订单状态
 *
 * @apiParam {Number}   id            订单ID
 * @apiParam {Number}   t             时间戳
 * @apiParam {String}   sign          签名,按参数字母升序将值连接成一个字符串并用md5加密,md5({id}{partner}{secret(密钥)}{t})
 *
 * @apiExample Example usage:
 * curl -i http://115.28.102.142:8000/v1/api/order/status?id={id}&t={t}&sign={sign}&partner={partner}
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data":{"status":"等待处理|下单成功|下单失败|支付成功|支付失败"}
 *     }
 *
 * @apiError DATA_INVALID   parameter error.
 * @apiError SIGN_INVALID   signature verification failed.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "success":false,
 *       "error": {"code":"DATA_INVALID","message":"{parameter error}"}
 *     }
 *
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "success":false,
 *       "error": {"code":"SIGN_INVALID","message":"signature verification failed."}
 *     }
 * */
router.get('/order/status', async function (ctx, next) {
    var secret = 'y(T|D/g6';
    var id = ctx.request.query.id;
    var sign = ctx.request.query.sign;
    var t = ctx.request.query.t;
    var partner = ctx.request.query.partner;
    var ret = {};

    if (!sign) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter sign'}};
        ctx.body = ret;
        return;
    } else if (!t) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter t'}};
        ctx.body = ret;
        return;
    } else if (!id) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter id'}};
        ctx.body = ret;
        return;
    } else if (!partner) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter partner'}};
        ctx.body = ret;
        return;
    }

    console.log(ctx.request.query.sign);
    var data = id + partner + secret + t;
    var _sign = md5(data);

    if (_sign == sign) {
        ctx.status = 202;
        ret = {'success': true, 'data': {'status': '等候处理'}};
    }
    else {
        ctx.status = 403;
        ret = {'success': false, 'error': {'code': 'SIGN_INVALID', 'message': 'signature verification failed'}}
    }

    if (debug)
        ret.debug = {'target': data, 'sign': _sign};


    ctx.body = ret;
});

/**
 * @api {get} /partner/balance 获取账户余额
 * @apiName GetPartnerBalance
 * @apiVersion 1.0.0
 * @apiGroup Order
 *
 * @apiDescription 获取合作伙伴账户余额
 *
 * @apiParam {String}   partner       合作伙伴名称
 * @apiParam {Number}   t             时间戳
 * @apiParam {String}   sign          签名,按参数字母升序将值连接成一个字符串并用md5加密,md5({partner}{secret(密钥)}{t})
 *
 * @apiExample Example usage:
 * curl -i http://115.28.102.142:8000/v1/api/partner/balance?partner={partner}&t={t}&sign={sign}
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data":{"order_id":"10000"}
 *     }
 *
 * @apiError DATA_INVALID   parameter error.
 * @apiError SIGN_INVALID   signature verification failed.
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "success":false,
 *       "error": {"code":"DATA_INVALID","message":"{parameter error}"}
 *     }
 *
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "success":false,
 *       "error": {"code":"SIGN_INVALID","message":"signature verification failed."}
 *     }
 * */
router.get('/partner/balance', async function (ctx, next) {
    var secret = 'y(T|D/g6';
    var partner = ctx.request.query.partner;
    var sign = ctx.request.query.sign;
    var t = ctx.request.query.t;
    var ret = {};

    if (!sign) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter sign'}};
        ctx.body = ret;
        return;
    } else if (!t) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter t'}};
        ctx.body = ret;
        return;
    } else if (!partner) {
        ctx.status = 400;
        ret = {'success': false, 'error': {'code': 'DATA_INVALID', 'message': 'missing parameter id'}};
        ctx.body = ret;
        return;
    }

    var data = partner + secret + t;
    var _sign = md5(data);

    if (_sign == sign) {
        ctx.status = 202;
        ret = {'success': true, 'data': {'balance': 9999.99}};
    }
    else {
        ctx.status = 403;
        ret = {'success': false, 'error': {'code': 'SIGN_INVALID', 'message': 'signature verification failed'}}
    }

    if (debug)
        ret.debug = {'target': data, 'sign': _sign};


    ctx.body = ret;
});

module.exports = router;