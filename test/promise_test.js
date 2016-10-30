/**
 * Created by zt on 16/10/30.
 */

'use strict'

var promise_test = new Promise((resolve, reject)=> {
    setTimeout(()=>{
        resolve(1);
    },2000);
});



async function test(){
    p= await promise_test;
    console.log(p);
}

test();
console.log('complete');