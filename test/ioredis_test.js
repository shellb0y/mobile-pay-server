/**
 * Created by zt on 17/1/12.
 */
const Redis = require('../redis');

Redis.server.set('111',1);
Redis.server.expire('111',10);
Redis.server.get('111',function (err,data) {
    console.log(data);
});

Redis.server.set('111',111).then((data)=>{
   console.log(data);
});

// Redis.server.quit();

Redis.server.pipeline().hmset('1111',{a:1,b:2}).expire('1111',10).exec().then(data=>{
    console.log(data);
});
