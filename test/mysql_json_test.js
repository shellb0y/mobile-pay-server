/**
 * Created by zt on 16/10/30.
 */
var db = require('../models/db');

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
db.sequelize.query("select * from ticket_order where json_extract(_data,'$.name')='David1'",
    {type: db.sequelize.QueryTypes.SELECT/*,model:db.ticket_order*/}).then((to)=> {
    console.log(to);
});

//db.ticket_order.findOne({where: {order_id: 1}}).then((to)=> {
//    console.log(to.get({'plain': true}));
//});