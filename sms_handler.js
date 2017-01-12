/**
 * Created by zt on 17/1/12.
 */

const RULE = {
    //银联在线支付验证码：747687，金额189.50元RMB，商户：北京途牛国际旅行社有，订单尾号：003800，请勿泄露！【浦发银行】
    '浦发银行': {
        pattern: /银联在线支付验证码：(\d{6})，金额(\d+\.\d+)元RMB，商户：(.+)，订单尾号：(\d{6})，请勿泄露！【浦发银行】/, location: {
            code: 1, amount: 2, target: 3, id: 4
        }
    },
    //订单号：京东支付9123；金额：人民币元 1.00；手机交易码591685，切勿泄露。[中国银行]
    '中国银行': {
        pattern: /订单号：(.+)支付(\d{4})；金额：人民币元 (\d+\.\d+)；手机交易码(\d{6})，切勿泄露。\[中国银行\]/, location: {
            code: 4, amount: 3, target: 1, id: 2
        }
    }
};

let SmsHandler = function () {

};

SmsHandler.exec = (sms) => {
    for (let bank in RULE) {
        if (sms.indexOf(bank) >= 0) {
            let group = sms.match(RULE[bank].pattern);
            if (group.length < 4) {
                return;
            }

            let data = {};

            return {
                source: group[0],
                code: group[RULE[bank].location.code],
                amount: group[RULE[bank].location.amount],
                target: group[RULE[bank].location.target],
                id: group[RULE[bank].location.id],
                bank: bank
            };
        }
    }
};


module.exports = SmsHandler;



