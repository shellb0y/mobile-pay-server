/**
 * Created by zt on 16/11/15.
 */
var db = require('../models/db');
var fs = require('fs');
require('../date_ex');

//var trade_no = "_input_charset=utf-8&body=%E8%AE%A2%E5%8D%95%E5%8F%B7%EF%BC%9A1005223639&it_b_pay=29m&notify_url=http%3A%2F%2Fcashier.tuniu.com%2Falipay%2FapppayNotify&out_trade_no=00380000723947211090614230005050&partner=2088701781421683&payment_type=1&seller_id=xiongfang%40tuniu.com&service=mobile.securitypay.pay&sign=KiLUQ7bPpYwxyiiiA6y3t2DO%2B4ry33IafFaafmZbv%2B9mPxSq1e7JLBsnhieDKsFc6RAlh26aTAfibewRLzRska5NPAK5tw%2BZrzCD7XtlN5me5vrXY3WdRBwfvJN%2FSsHOXf0bEDGOaczgNOlu96RYBJfAb8hFPEBJnwsgIvpd45A%3D&sign_type=RSA&subject=%E9%80%94%E7%89%9B%E6%97%85%E6%B8%B8%E7%BD%91&total_fee=50.50".match(/\d{32}/ig);
//console.log(trade_no);

// var data = [];
// db.sequelize.query(`SELECT _status,created ,pay->"$.price" as 'price'
//     ,pay->"$.alipay_url"  as url,pay->"$.bizOrderId" as 'bizOrderId',pay->"$.partner_order_id" as 'partner_order_id'
// FROM mobile_pay.ticket_order where _status in('已完成','退款成功','已取消','退票成功')`,
//     {type: db.sequelize.QueryTypes.SELECT/*,model:db.ticket_order*/}).then((to)=> {
//     to.forEach((t)=>{
//         console.log(`${t._status},${t.created.format('yyyy-MM-dd')},${t.price},'${t.url.match(/\d{32}/ig)[0]},${t.bizOrderId},${t.partner_order_id}`);
//         //fs.appendFileSync('data.csv',`${t._status},${t.created.format('yyyy-MM-dd')},${t.price},${t.url.match(/\d{32}/ig)[0]},${t.bizOrderId},${t.partner_order_id}\n`);
//     });
// });

db.account.findAll().then(_data => {
    let username, password, data;
    for (let d of _data) {
        // console.log(d.dataValues);
        data = JSON.parse(d.dataValues._data);
        let account = `${data.username}----${data.password}\n`;

        fs.appendFile('account.txt', account, (err, data) => {
            if (!err) {
                console.log(account);
            }
        });
    }
});