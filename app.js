const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')({formLimit: '5mb'});
const logger = require('koa-logger');

const index = require('./routes/index');
const _console = require('./routes/console');
const mobile_pay_api = require('./api/mobile-pay-api');
const monitor = require('./routes/monitor');
const upload = require('./routes/upload');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));
app.use(require('koa-static')(__dirname + '/node_modules'));

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/console', _console.routes(), _console.allowedMethods());
router.use('/api/mobilepay', mobile_pay_api.routes(), mobile_pay_api.allowedMethods());
router.use('/monitor', monitor.routes(), monitor.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error',async function (err, ctx, next) {
    console.log(err);
    logger.error('server error', err, ctx);
    await next();
});


module.exports = app;