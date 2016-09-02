/**
 * Created by zt on 16/8/31.
 */
var router = require('koa-router')();
var sander = require('sander');

router.get('/:date?/:orderid?', async function (ctx, next) {
    let path = process.cwd() + '/public/upload';
    let orderid = ctx.params.orderid;
    let date = ctx.params.date;

    if (date)
        path = path + "/" + date;
    if (orderid)
        path = path + "/" + orderid;

    var list = sander.readdirSync(path);
    path = path.substring(path.indexOf('/upload'));
    await ctx.render('upload', {
        files: list,
        path: path,
        prev_path: path.substring(0,path.lastIndexOf('/'))
    });
});

module.exports = router;
