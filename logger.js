/**
 * Created by zt on 16/7/18.
 */
var dgram = require('dgram');
var host = '192.168.1.93';
var port = 55514;

function send2Server(level,message){
    var client = dgram.createSocket('udp4');
    var data = {'appname':'mps','message':message,'level':level};
    data = JSON.stringify(data);
    var message = new Buffer(data);
    client.send(data, 0, message.length, port, host, function (err, bytes) {
        if (err)
            console.error(err);
    });
}

exports.t = (message)=>{
    console.log(message);
};

exports.i = (message)=>{
    send2Server("DEBUG",message);
};

exports.w = (message)=>{
    send2Server("WARN",message);
};

exports.d = (message)=>{
    send2Server("DEBUG",message);
};

exports.e = (message)=>{
    console.error(message);
    if(message.stack)
        send2Server("ERROR",message.stack);
    else
        send2Server("ERROR",message);
};