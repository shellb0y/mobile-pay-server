$(function () {
    var socket = io.connect('/control');
    var terminal;
    socket.on('connect', function () {
        $('body').terminal(function (command, term) {
            terminal = term;
            if (command == 'clear') {
                term.clear();
            }else if (command !== '') {
                socket.emit('control', command);
            }
        }, {
            greetings: 'Welcome to box-server web terminal\r\n----------------'
        });

        socket.on('log', function (data) {
            if(data) {
                terminal.echo(data);
            }
        });

        //socket.on('checkcode_result', function (data) {
        //    if(data) {
        //        terminal.echo(JSON.stringify(data));
        //    }
        //});

        socket.on('disconnect', function () {
            terminal.echo('disconnect');
        });
    });

});