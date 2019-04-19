const moment = require('moment')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const assert = require('assert')
// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

exports.getToken = token =>{
  const _token = token.split(' ')[1]
  let _res = -1
  if(_token !== 'login'){
    const _id = new Buffer(_token.split('.')[1], 'base64')
    _res = JSON.parse(_id.toString())
  }
  return _res
}

// 处理成功响应
exports.getAgent = (ctx) => {
  const deviceAgent = ctx.request.header['user-agent'].toLowerCase()
  const isiOS = deviceAgent.indexOf('mac os x') > -1 || deviceAgent.indexOf('ios') > -1 || deviceAgent.indexOf('iphone') > -1 //ios终端
  const isAndroid = deviceAgent.indexOf('android') > -1 || deviceAgent.indexOf('linux') > -1  || deviceAgent.indexOf('Android') > -1 || deviceAgent.indexOf('Linux') > -1
  if (isAndroid) {
    return 'Android'
  } else if(isiOS) {
    return 'IOS'
  }else{
    return 'PC'
  }
}

exports.success = ({ ctx , res = null, code = 0 ,  msg = '请求成功' , status = 200 })=> {
  ctx.body = {
    code: code,
    data: res,
    msg
  }
  ctx.status = status
}

exports.list = ({ ctx, res = null, current , pageSize })=> {
  ctx.body = {
    list: res.list,
    pagination:{
      current: current,
      pageSize: pageSize,
      total:res.count
    },
    code:0
  }
  ctx.status = 200
}

exports.uploadmk =  (self) => {
  const dateMk = moment().format('YYYYMMDD')
  const target = path.join(self.config.baseDir, self.config.llpath.upload + dateMk)
  const _dir = fs.existsSync(target)
  if(!_dir){
    fs.mkdirSync(target, 777)
  }
  return dateMk
}

exports.tomd5 = (str) =>{
  const md5 = crypto.createHash('md5')
  return md5.update(str).digest('hex')
}

exports.bufferToJSON = (str) => {
  if (str && typeof str === 'object' && Buffer.isBuffer(str)){
    return JSON.parse(str.toString('utf-8'))
  }
  return str
}

exports.todes = (data,ctx) =>{
  const param={
    alg: 'des-ede3',
    autoPad: true,
    key: ctx.app.config.llpath.mykey,
    plaintext: JSON.stringify(data),
    iv: null
  }
  //console.log("请求数据加密前:" +  param.plaintext);
  const key = new Buffer(param.key, 'base64')
  const iv = new Buffer(param.iv ? param.iv : 0)
  let cipher = crypto.createCipheriv(param.alg, key, iv)
  cipher.setAutoPadding( param.autoPad)
  let ciph = cipher.update(param.plaintext, 'utf8', 'base64')
  ciph += cipher.final('base64')
  //console.log("请求数据加密后:" + ciph);
  return ciph
}

exports.dedes = (data,ctx) =>{
  const param={
    alg: 'des-ede3',
    autoPad: true,
    key: ctx.app.config.llpath.mykey,
    plaintext: data.toString('utf-8'),
    iv: null
  }
  //console.log("返回数据解密前:" +  param.plaintext);
  const key = new Buffer(param.key, 'base64')
  const iv = new Buffer(param.iv ? param.iv : 0)
  const decipher = crypto.createDecipheriv(param.alg, key, iv)
  decipher.setAutoPadding(true)
  let txt = decipher.update(param.plaintext, 'base64', 'utf8')
  txt += decipher.final('utf8')
  //console.log("返回数据解密后:" + txt);
  return txt
}
