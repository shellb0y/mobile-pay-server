/**
 * Created by zt on 16/7/8.
 */

var man = '\nCommand:\n\n' +
    '  dcc   \<str\> checkcode解码\n'+
    '  ecc   \<str\> checkcode编码\n'+
    '  realm \<str\> 计算token参数\n';


var commands = [
    {regex: /^dcc (.*)/, action: d_check_code},
    {regex: /^ecc (.*)/, action: e_check_code},
    {regex: /^realm (.*)/, action: realm}
];

var sock;

exports.man = man;

exports.exec = function (command, socket) {
    var valid = false;
    sock = socket;

    for (var i = 0; i < commands.length; i++) {
        if (commands[i].regex.test(command)) {
            valid = true;
            commands[i].action(command.split(' '), socket);
        }
    }

    return valid;
};

function realm(args){
    sock.emit('realm', args[1],args[2]);
}

function d_check_code(args){
    sock.emit('d_checkcode', args[1],args[2]);
}

function e_check_code(args){
    sock.emit('e_checkcode', args[1],args[2]);
}