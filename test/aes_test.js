var crypto = require('crypto');
function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

console.log(parseFloat('10fda0.ds0') == 100);