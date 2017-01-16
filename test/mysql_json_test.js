/**
 * Created by zt on 16/10/30.
 */
var db = require('../models/db');
require('../date_ex');

//for(i=2;i<10000;i++) {
//    db.ticket_order.create({
//        order_id: i,
//        _data: {"mail": "jiangchengyao@gmail.com", "name": "David", "address": "Shangahai"},
//        _status: '待支付',
//        created: new Date()
//    }).then((ret)=>{
//        if(ret)
//            console.log(`#${i} success`)
//    })
//}

//db.ticket_order.findAll({
//    where: db.sequelize.where(db.sequelize.fn('json_extract', db.sequelize.col('_data'), '$.name'), 'David1')
//}).then((td)=>console.log(td));
//

//db.sequelize.query("select * from ticket_order where json_extract(_data,'$.name')='David1'",
//    {type: db.sequelize.QueryTypes.SELECT/*,model:db.ticket_order*/}).then((to)=> {
//    console.log(to);
//});

//db.ticket_order.findOne({where: {order_id: 1}}).then((to)=> {
//    console.log(to.get({'plain': true}));
//});


var readline = require('readline'),
    fs = require('fs');

var rl = readline.createInterface({
    input: fs.createReadStream('account'),
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    db.account.create({
            _data: {
                username: line.split('----')[0],
                password: line.split('----')[1]
            },
            _source: 'tuniu',
            get_count: 0,
            get_time: new Date(),
            order_count: 0,
            valid: 1,
            queue_count: 0,
            cookie: '',
            _status:''
        }
    ).then((data) => console.log(`${data} success`)).catch(err => {
        console.log(err);
    });
});

//db.ticket_order.findAll({
//    where: {
//        $or: {
//            _status: '抢票中',
//            $and: {
//                _status: '未入库',
//                check_partner_num: {$gte: 6}
//            },
//            $and: {_status: '待出票', created: {$lt: new Date().format('yyyy-MM-dd')}}
//        }
//    }, order: 'order_id'
//}).then((data)=>{
//    console.log(data);
//});

//db.sequelize.query('select * from account where _data->"$.username"=\'13192655251\'',
//    {type: db.sequelize.QueryTypes.SELECT/*,model:db.ticket_order*/}).then((to)=> {
//    if(to){
//        console.log(to[0].cookie);
//    }
//});
//

// db.account.findAll({
//     where: {or: {_status: null, _status: ''}, _source: 'tuniu'},
//     limit: 10
// }).then((accounts) => {
//     console.log(accounts);
// });

