/**
 * Created by zt on 16/8/31.
 */
var router = require('koa-router')();
var sander = require('sander');

router.get('/:dir?', async function (ctx, next) {
    let root = process.cwd() + '/public/upload';
    var dir = ctx.params.dir;
    console.log(ctx.params);
    if (dir)
        dir = root + "/" + dir;
    else
        dir = root;

    var list = await sander.readdirSync(dir);
    await ctx.render('upload', {files: list});
});

module.exports = router;
