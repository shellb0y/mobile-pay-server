/**
 * Created by zt on 16/9/2.
 */
    'use strict'
var logger = require('../logger');
var Enumerable = require('linq');
//logger.t("trace");
//logger.d("debug");
//logger.i("info");
//logger.w("warn");
//logger.e('test error');
//logger.e(new Error('test error'));


var client=[];
client["a"] = {'id':1,'data':'1'};
client["b"] = {'id':2,'data':'2'};
//console.log(client);
//delete client["c"];
//console.log(client);

console.log(client.length);
if(client.length){
    console.log('1');
}else{
    console.log('2');
}
