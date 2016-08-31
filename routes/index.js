var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'Mobile Pay Server'
  };

  await ctx.render('index', {
  });
});

module.exports = router;
