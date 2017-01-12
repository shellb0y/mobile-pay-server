/**
 * Created by zt on 17/1/12.
 */

const smsHandler = require('../sms_handler');
console.log(smsHandler.exec('订单号：京东支付9123；金额：人民币元 1.00；手机交易码591685，切勿泄露。[中国银行]'));
console.log(smsHandler.exec('银联在线支付验证码：747687，金额189.50元RMB，商户：北京途牛国际旅行社有，订单尾号：003800，请勿泄露！【浦发银行】'));


