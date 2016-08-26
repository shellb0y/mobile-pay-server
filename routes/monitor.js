var router = require('koa-router')();
var socket_server = require('../socket-server');

router.get('/client', async function (ctx, next) {
    ctx.state = {
        title: 'client monitor'
    };

    await ctx.render('monitor/client', {
        clients: socket_server.clients,
        connects: socket_server.terminal != 'undefined' ? socket_server.terminal.connected : null
});
});

module.exports = router;
