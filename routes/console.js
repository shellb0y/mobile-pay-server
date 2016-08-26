/**
 * Created by zt on 16/7/8.
 */
var router = require('koa-router')();

router.get('/', async function (ctx, next) {
    ctx.state = {
        title: 'Console'
    };

    await ctx.render('console', {
    });
});

module.exports = router;
