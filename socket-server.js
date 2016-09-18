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
var logger = require('./logger');

var clients = {};
var terminal, control;

exports.clients = clients;
exports.terminal = terminal;

exports.___init__ = (server)=> {
    io = require('socket.io')(server);

    terminal = io.of('/terminal').on('connection', (socket)=> {

        clients[socket.client.id] = {
            'id': socket.client.id,
            'address': socket.handshake.address,
            'recevied_time': socket.handshake.issued,
            'ip': socket.handshake.address,
            'message': ''
        };

        exports.terminal = terminal;
        //console.log(terminal.connected);
        logger.i(`terminal ${socket.client.id},${socket.handshake.address} on ${socket.handshake.time} connected.`);

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
        }).on('message', (ip, msg)=> {
            if (!msg) {
                clients[socket.client.id].ip = ip;
            } else {
                clients[socket.client.id].message = msg;
                clients[socket.client.id].recevied_time = new Date();
            }
        }).on('disconnect', ()=> {
            logger.i(`termnal ${socket.client.id},${socket.handshake.address} on ${new Date()} disconnected.`);
            //let client = Enumerable.from(clients).where(`$ && $.id=='${socket.client.id}'`).singleOrDefault();
            //if (client) {
            //    delete clients[clients.indexOf(client)];
            //}
            delete clients[socket.client.id];
            socket = null;
        });
    });

    control = io.of('/control').on('connection', (socket)=> {
        console.log(`control ${socket.client.id},${socket.handshake.address} on ${socket.handshake.time} connected.`);

        socket.on('control', (data)=> {
            if (data == 'help') {
                socket.emit('log', command.man);
                return;
            }

            if (clients) {
                if (!command.exec(data, terminal.sockets, clients, socket)) {
                    socket.emit('log', 'bad command.');
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