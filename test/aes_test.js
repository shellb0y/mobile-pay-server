var crypto = require('crypto');
function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

console.log(md5('115975656986testy(T|D/g61481103155922'));

if(!undefined)
    console.log('ok');

console.log(Date.now());