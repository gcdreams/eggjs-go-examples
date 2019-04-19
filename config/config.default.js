const path = require('path')
// {app_root}/config/config.default.js

module.exports = appInfo => {
  
  const config = exports = {}
  config.keys = appInfo.name + '_1513779989145_1984'
  config.llpath = {
    pcurl: 'http://127.0.0.1/lianapi-v1/assets', //PC端图片地址
    wapurl: 'http://127.0.0.1/lianapi-v1/assets',//移动端图片地址
    images: 'assets', //静态文件文件夹
    upload: 'assets/',//图片上传文件夹
    curlUrl: 'https://www.tianqiapi.com/', //curl地址
    curlTimeOut: 3000, //curl超时时间
    mykey: 'eb3bCk3NSqiRxv2R7vTyOhgoiownIXav' //DES3密钥 32位
  }

  config.static = {
    prefix:'/' + config.llpath.images + '/',
    dir: path.join(appInfo.baseDir, config.llpath.images),
    dynamic: true,
    preload: false,
    maxAge: 31536000,
    buffer: false
  }

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    }
  }

  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
  }

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  }

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false
    },
    domainWhiteList: [ '*' ],
  }

  config.multipart = {
    fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov' ], // 增加对 .apk 扩展名的支持
  }
  
  config.bcrypt = {
    saltRounds: 10 // default 10
  }

  config.mongoose = {
    url: 'mongodb://admin:gaochao@127.0.0.1:27017/LianApi',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true, 
    match: '/jwt', 
  }

  config.jwtSet = {
    key: 'gaochao09240924',
    tokenTime: '15s',
    cookiesTime: 60*1000*60
  }

  config.middleware = [ 'tokenHandler' , 'errorHandler' ]

  config.tokenHandler = {
    config: config.jwtSet,
    urlMatch: '/api/testJWT',
  }

  config.customLogger = {
    curlLogger: {
      file: path.join(appInfo.baseDir, 'logs/lianlian-curl.log')
    }
  }

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'test',
      debug: false
    },
    app: true,
    agent: false,
  }

  config.redis = {
    client: {
      port: 6380,          
      host: '127.0.0.1',   
      password: '',
      db: 10
    },
  }

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {'.html': 'ejs'}
  }
  return config
}
