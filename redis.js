/**
 * Created by zt on 17/1/12.
 */
const Redis = require('ioredis');

let redis = function () {

};

redis.server = new Redis({
    port: 6378,          // Redis port
    host: '120.26.213.143',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: 'melodicdeath',
    db: 0
});

module.exports = redis;