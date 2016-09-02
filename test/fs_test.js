/**
 * Created by zt on 16/8/31.
 */

var fs = require("fs");
var sander = require('sander');
fs.readdir('../public/upload', function (err, list) {
    if (err)
        console.error(err);
    console.log(list);
});
sander.exists("../public/32432/").then((exist)=> {
    console.log(exist);
});

if (sander.existsSync("../public/upload/")) {
    console.log("exist");
}

new Promise((resolved, reject)=> {
    resolved("1");
}).then((data)=> {
    console.log(data);
}).then(()=> {
    console.log('2')
}).then(()=> {
    console.log('3');
}).catch((err)=> {
    console.log(err);
});