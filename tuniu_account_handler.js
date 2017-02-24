/**
 * Created by zt on 16/12/9.
 */
var request = require('request-promise');
var db = require('./models/db');
require('./string_ex');
var cronJob = require('cron').CronJob;
var logger = require('./logger');


var tuniu_account_handler = function () {

};

tuniu_account_handler.prototype.exec = function () {
    new cronJob('0 30 6,12,18 * * *', function () {
        db.sequelize.query('update account set _status=null,order_count = 0').catch((err) => {
            console.error(err);
        });
    }, null, true);

    setInterval(() => {
        db.account.findAll({
            where: {_status: null, _source: 'tuniu'},//,
            limit: 2000
        }).then((accounts) => {
            if (accounts) {
                accounts.forEach((a) => {
                    request({
                        method: 'PUT',
                        uri: 'http://139.199.65.115:1218/?name=tuniu_login&opt=put&auth=Fb@345!',
                        body: JSON.parse(a._data),
                        json: true
                    }).then(function (repos) {
                        a._status = '等待登录';
                        a.queue_count++;
                        a.save();
                    })
                        .catch(function (err) {
                            logger.e(err);
                        });
                });
            }
        });
    }, 60 * 1000);
};


module.exports = tuniu_account_handler;