/**
 * Created by zt on 16/7/8.
 */

var man = '\nCommand:\n\n' +
    '  service  <all|{terminal...}> start|stop|restart 启动|停止|重启 支付服务\n' +
    '  terminal <all|{terminal...}> /adb command/ 向终端发送adb命令\n';

var commands = [
    {regex: /^service (.*) start$/, action: service_start},
    {regex: /^service (.*) stop$/, action: service_stop},
    {regex: /^service (.*) restart$/, action: service_restart},
    {regex: /^terminal (.*) reboot$/, action: terminal_reboot}
];

var sock;
exports.man = man;

exports.exec = function (command, sockets, clients, socket) {
    var valid = false;
    sock = socket;

    for (var i = 0; i < commands.length; i++) {
        if (commands[i].regex.test(command)) {
            valid = true;
            var _commands = command.split(' ');
            //if (_commands[0] == 'service') {
            _commands = _commands.splice(1, _commands.length - 2);
            var socket_ids = [];
            if (_commands[0] == 'all') {
                for (var id in sockets) {
                    socket_ids.push(id);
                }
            } else {
                for (var ip of _commands) {
                    for (var id in clients) {
                        if (clients[id].ip == ip) {
                            socket_ids.push("/terminal#" + id);
                        }
                    }
                }
            }

            commands[i].action(socket_ids, sockets, clients);
            //} else {
            //
            //}
        }
    }

    return valid;
};

function service_start(socket_ids, sockets, clients) {
    for (var id of socket_ids) {
        sockets[id].emit('start', 1);
        sock.emit('log', `${id} ${clients[id.replace('/terminal#', '')].ip} send success`);
    }
}

function service_stop(socket_ids, sockets, clients) {
    for (var id of socket_ids) {
        sockets[id].emit('start', 0);
        sock.emit('log', `${id} ${clients[id.replace('/terminal#', '')].ip} send success`);
    }
}

function service_restart(socket_ids, sockets, clients) {
    for (var id of socket_ids) {
        sockets[id].emit('control', 'am force-stop com.fangbian.mobilepay',
            'am start -n com.fangbian.mobilepay/com.fangbian.mobilepay.MainActivity');
        sock.emit('log', `${id} ${clients[id.replace('/terminal#', '')].ip} send success`);
    }
}

function terminal_reboot(socket_ids, sockets, clients) {
    for (var id of socket_ids) {
        sockets[id].emit('control', 'reboot');
        sock.emit('log', `${id} ${clients[id.replace('/terminal#', '')].ip} send success`);
    }
}