/**
 * Created by zt on 16/10/30.
 */

'use strict';

var promise_test = new Promise((resolve, reject)=> {
    setTimeout(()=>{
        reject(1);
    },2000);
});



async function test(){
    try {
        var p = await promise_test;
        console.log(p);
    }catch(err){
        console.error(err);
    }
}

test();
console.log('complete');

