module.exports = appInfo => {

  const config = exports = {}

  config.llpath = {
    pcurl: 'http://127.0.0.1/lianapi-v1/assets',
    wapurl: 'http://127.0.0.1/lianapi-v1/assets',
    images: 'assets',
    upload: 'assets/',
    curlUrl: 'http://p2p-inner-jxq-test.ljjr.com/p2p-inner/',
    curlTimeOut: 3000,
    mykey: '123456789'
  }

  config.mongoose = {
    url: 'mongodb://mongouser:mongopassword@127.0.0.1:27017/gcprod',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  config.swaggerdoc = {
    enable: false,
  }

  return config
}


