/**
 * Created by zt on 16/11/3.
 */
var crypto = require('crypto');
var fs = require('fs');

//var pem = fs.readFileSync('../rsa_public_key_new.pem');
//console.log(pem);

var pem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqqA79NUvXvsXnA+S/WkhkAm7pOV9
pcwoXr9qyG9YDf+Qeh3xOBPBrxxOcZd7dGnSF/qPBSEJUAfWfe50ei2xc0avMB7VJpJcvQ/S
CktdESoIa3d1wAG144muQETv0HrDjcVcEUGmkNMYncAqsqXNN7E939fyQb6PizBml14EKwEh
i2RCb5a7/GXIcJve5Tj8CX417712eI2NKrST7AJg1dBegfKHtsddy4XS6D2wWeWMRA42kq+A
La16njD5MdZPCbLXR10o6MACignfIn9Kj8CaNsWYN5GVkadVrGOK6CI10ppp2mOJJAtXOfrO
sIL6+y3hXsMI7VxWPwUJn4dNCQIDAQAB
-----END PUBLIC KEY-----`;

var data = crypto.publicEncrypt({key: pem, padding: crypto.constants.RSA_PKCS1_PADDING},
    Buffer.from('573.0', 'utf-8'));

console.log(data.toString('base64'));

//var sign_util = require('../SignUtil');
//var a= new sign_util();
//console.log(a.encrypt('573.0'));

