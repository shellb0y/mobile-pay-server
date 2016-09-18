/**
 * Created by zt on 16/9/2.
 */
    'use strict'
var logger = require('../logger');

//logger.t("trace");
//logger.d("debug");
//logger.i("info");
//logger.w("warn");
//logger.e('test error');
//logger.e(new Error('test error'));


var client=[];
client["a"] = 1;
client["b"] = 2;
//console.log(client);
//delete client["c"];
//console.log(client);

for(var i in client){
    console.log(client[i]);
}
