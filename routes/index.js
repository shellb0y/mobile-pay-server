var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: '12306 Crack Server'
  };

  await ctx.render('index', {
  });
})
module.exports = router;
