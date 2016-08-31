/**
 * Created by zt on 16/7/8.
 */

var man = '\nCommand:\n\n' +
    '  upload_image   \<str\> 上传图片\n'+
    '  save_order   \<str\> 保存订单数据\n';


var commands = [
    {regex: /^upload_image (.*)/, action: upload_image},
    {regex: /^save_order (.*)/, action: save_order},
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

function upload_image(args){
    console.log("upload_image");
}

function save_order(args){
    console.log("save_order");
}
