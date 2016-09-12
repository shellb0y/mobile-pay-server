/**
 * Created by zt on 16/8/26.
 */

var command = require('./command');
var Enumerable = require('linq');
require('./date_ex');
require('./string_ex');
var db = require('./models/db');
var sander = require('sander');
var io;

var clients = [];
var terminal, control;

exports.clients = clients;
exports.terminal = terminal;

exports.___init__ = (server)=> {
    io = require('socket.io')(server);

    terminal = io.of('/terminal').on('connection', (socket)=> {

        clients.push({
            'id': socket.client.id,
            'address': socket.handshake.address,
            'send_time': 0,
            'recevied_time': socket.handshake.issued,
            'ip': socket.handshake.address
        });

        exports.terminal = terminal;
        //console.log(terminal.connected);
        console.log(`terminal ${socket.client.id},${socket.handshake.address} on ${socket.handshake.time} connected.`);

        socket.on('upload_image', (data)=> {
            console.log(`upload image ${data.name}`);
            data = JSON.parse(data);
            let bitmap = new Buffer(data.image, 'base64');
            let path = `public/upload/${new Date().format('yyyy-MM-dd')}/${data.id}`;

            sander.exists(path).then((exist)=> {
                if (!exist)
                    sander.mkdir(path);
            }).then(()=> {
                sander.writeFile(path + '/' + data.name, bitmap);
            }).then(()=> {
                console.log(`${data.name} upload success`);
            }).catch((err)=> {
                console.log(err);
            });
        }).on("save_order", (data)=> {
            console.log(`save order ${data}`);
            if (data) {
                data = JSON.parse(data);
                console.log(data.origin_id);
                //db.order.findOne({where: {origin_id: data.origin_id}}).then(function (order) {
                //    if (order)
                //        return db.order.update(data, {where: {origin_id: data.origin_id}});
                //    else
                //        return db.order.create(data);
                db.order.create(data).then((ret)=> {
                    if (ret)
                        console.log("save order success");
                    else
                        console.log("save order faild");
                });
            }
        }).on('disconnect', ()=> {
            console.log(`termnal ${socket.client.id},${socket.handshake.address} on ${new Date()} disconnected.`);
            let client = Enumerable.from(clients).where(`$ && $.id=='${socket.client.id}'`).singleOrDefault();
            if (client) {
                delete clients[clients.indexOf(client)];
            }

            socket = null;
        });
    });

    control = io.of('/control').on('connection', (socket)=> {
        console.log(`control ${socket.client.id},${socket.handshake.address} on ${socket.handshake.time} connected.`);

        socket.on('control', (data)=> {
            if (data == 'help')
                socket.emit('log', command.man);
            else if (data == 'show clients') {
                socket.emit('log', 'id'.padRight(30) + 'address'.padRight(30) + 'send_time'.padRight(30) + 'recevied_time'.padRight(30) + 'ip'.padRight(30));
                clients.map((c)=> {
                    socket.emit('log', c.id.padRight(30) + c.address.padRight(30) + (new Date(c.send_time).format('yyyy-MM-dd hh:mm:ss') + '').padRight(30) +
                        (new Date(c.recevied_time).format('yyyy-MM-dd hh:mm:ss') + '').padRight(30) + c.ip.padRight(30));
                });
            }
            else if (clients.length > 0) {
                let client = Enumerable.from(clients).where('$').orderBy('$.send_time').toArray()[0];
                if (client) {
                    client.send_time = Date.parse(new Date());
                    if (!command.exec(data, terminal.sockets["/terminal#" + client.id])) {
                        socket.emit('log', 'bad command.');
                    }
                }
                else {
                    socket.emit('log', 'connection loss');
                }
            }
            else {
                socket.emit('log', 'terminals not enough');
            }
        });

    }).on('disconnect', ()=> {
        console.log(`control ${socket.client.id},${socket.handshake.address} on ${new Date()} disconnected.`);
        socket = null;
    });
};

exports.send = (msg)=> {
    console.log(`send ${msg}`);
    let error = '';
    if (clients.length > 0) {
        let client = Enumerable.from(clients).where('$').orderBy('$.send_time').toArray()[0];
        if (client) {
            client.send_time = new Date();
            if (!command.exec(`${msg.cmd} ${msg.sid} ${msg.data}`, terminal.sockets["/terminal#" + client.id]))
                error = 'bad command';
            else
                error = 'accept';
        }
    } else
        error = 'terminal not enough';

    return error;
};


exports.recevie = (id)=> {
    console.log(`recevie ${id}`);

    //return new Promise((resolve, reject)=> {
    //    db.client.hgetall(`box-server:sid:${id}`, (err, reps)=> {
    //        if (err) {
    //            console.log(`redis error - ${err}`);
    //            reject(err);
    //        }
    //        else {
    //            db.client.del(`box-server:sid:${id}`);
    //            resolve(reps);
    //        }
    //    });
    //});
};


function handler_checkcode_realm(data, socket) {
    //if (!data.error) {
    //    let client = Enumerable.from(clients).where(`$ && $.id=='${socket.client.id}'`).singleOrDefault();
    //    if (client) {
    //        client.recevied_time = data.timespan;
    //        client.ip = data.ip;
    //        control.emit('log', `${socket.client.id}-${data.ip ? socket.handshake.address : data.ip}-${new Date(data.timespan).format('yyyy-MM-dd hh:mm:ss')}-\n${data.data}`);
    //    }
    //    else {
    //        let error = `cannot find terminal[${socket.client.id}],maybe was disconnected.`;
    //        data.error = error;
    //        control.emit('log', error);
    //    }
    //} else {
    //    control.emit('log', data.error);
    //}
    //
    //if (async == 0) {
    //
    //    db.client.hmset('box-server:sid:' + data.id, {
    //        'id': data.id,
    //        'recevied_data': data.data,
    //        'recevied_time': data.timespan,
    //        'error': data.error
    //    });
    //
    //    db.client.expire('box-server:sid:' + data.id, 600);
    //}
}