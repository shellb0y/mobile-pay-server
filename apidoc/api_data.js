define({ "api": [  {    "type": "get",    "url": "/order/status",    "title": "获取订单状态",    "name": "GetOrderStatus",    "version": "1.0.0",    "group": "Order",    "description": "<p>通过交易号查询订单状态</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "trade_no",            "description": "<p>订单交易号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "partner",            "description": "<p>商户号</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "t",            "description": "<p>时间戳</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "sign",            "description": "<p>签名,按参数字母升序将值连接成一个字符串并用md5加密,md5({partner}{secret(密钥)}{t}{trade_no})</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://115.28.102.142:8000/v1/api/order/status?trade_no={trade_no}&t={t}&sign={sign}&partner={partner}",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\":{\"status\":\"等待处理|下单成功|下单失败|支付成功|支付失败\"}\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "DATA_INVALID",            "description": "<p>parameter error.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "SIGN_INVALID",            "description": "<p>signature verification failed.</p>"          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "HTTP/1.1 200 OK\n{\n  \"success\":false,\n  \"error\": {\"code\":\"DATA_INVALID\",\"message\":\"{parameter error}\"}\n}\n\nHTTP/1.1 200 OK\n{\n  \"success\":false,\n  \"error\": {\"code\":\"SIGN_INVALID\",\"message\":\"signature verification failed.\"}\n}",          "type": "json"        }      ]    },    "filename": "api/partner_order.js",    "groupTitle": "Order"  },  {    "type": "get",    "url": "/partner/balance",    "title": "获取账户余额",    "name": "GetPartnerBalance",    "version": "1.0.0",    "group": "Order",    "description": "<p>获取商户账户余额</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "partner",            "description": "<p>商户号</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "t",            "description": "<p>时间戳</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "sign",            "description": "<p>签名,按参数字母升序将值连接成一个字符串并用md5加密,md5({partner}{secret(密钥)}{t})</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://115.28.102.142:8000/v1/api/partner/balance?partner={partner}&t={t}&sign={sign}",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\":{\"balance\":9999.99}\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "DATA_INVALID",            "description": "<p>parameter error.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "SIGN_INVALID",            "description": "<p>signature verification failed.</p>"          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "HTTP/1.1 200 OK\n{\n  \"success\":false,\n  \"error\": {\"code\":\"DATA_INVALID\",\"message\":\"{parameter error}\"}\n}\n\nHTTP/1.1 200 OK\n{\n  \"success\":false,\n  \"error\": {\"code\":\"SIGN_INVALID\",\"message\":\"signature verification failed.\"}\n}",          "type": "json"        }      ]    },    "filename": "api/partner_order.js",    "groupTitle": "Order"  },  {    "type": "GET",    "url": "/order",    "title": "提交订单",    "name": "PostOrder",    "version": "1.0.0",    "group": "Order",    "description": "<p>提交订单</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>商户订单号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "mobile",            "description": "<p>待充值的手机号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "amount",            "description": "<p>金额,暂时只支持100元的话费充值</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "partner",            "description": "<p>商户号</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "callback",            "description": "<p>商户回调地址</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "t",            "description": "<p>时间戳</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "sign",            "description": "<p>签名,按参数字母升序将值连接成一个字符串并用md5加密,md5({amount}{urlencode(callback)}{id}{mobile}{partner}{secret(密钥)}{t})</p>"          }        ]      }    },    "examples": [      {        "title": "Example usage:",        "content": "curl -i http://115.28.102.142:8000/v1/api/order?amount={amount}&callback={callback}&id={id}&mobile={mobile}&partner={partner}&t={t}&sign={sign}",        "type": "json"      },      {        "title": "Callback(GET):",        "content": "curl -i http://xxxxxx?trade_no={交易号}&amount={金额}&success={1(成功)|0(失败)}&t={时间戳}&sign=md5({amount}{secret(密钥)}{success}{t}{trade_no})\nHTTP/1.1 200\n{\n  \"success\":1(成功)|0(失败),\n}",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\":{\"trade_no\":\"JDPH2016120810000000000001\"}\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "DATA_INVALID",            "description": "<p>parameter error.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "SIGN_INVALID",            "description": "<p>signature verification failed.</p>"          }        ]      },      "examples": [        {          "title": "Response (example):",          "content": "HTTP/1.1 200 OK\n{\n  \"success\":false,\n  \"error\": {\"code\":\"DATA_INVALID\",\"message\":\"{parameter error}\"}\n}\n\nHTTP/1.1 200 OK\n{\n  \"success\":false,\n  \"error\": {\"code\":\"SIGN_INVALID\",\"message\":\"signature verification failed.\"}\n}",          "type": "json"        }      ]    },    "filename": "api/partner_order.js",    "groupTitle": "Order"  }] });
