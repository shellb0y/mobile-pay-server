var db = require('../models/db');
var request = require('request-promise');
//db.account.findAll({where: {_status: null,_source:'tuniu'}}).then((accounts)=> {
//    if (accounts) {
//        accounts.forEach((a)=> {
//            console.log(a._data);
//        });
//    }
//});

request({
    method: 'PUT',
    uri: 'http://139.199.65.115:1218/?name=tuniu_login&opt=get&auth=Fb@345!',
    body: {a: 1, b: 2},
    json: true
}).then(function (repos) {
    console.log(repos);
        console.log(`push to queue success`);
    })
    .catch(function (err) {
        console.log(err);
    });