require('../date_ex');

var t = new Date().getTime() - 30 * 60 * 1000;
console.log(t);
console.log(new Date());
console.log(new Date().format('yyyy-MM-dd hh:mm:ss'));