const Service = require('egg').Service
const moment = require('moment')
class MycurlService extends Service{

  async get(url){
    const res = await this.ctx.curl(url, {
      dataType: 'json',
      timeout: 3000,
    })
    return res
  }

  async curlall(url,method,req,encrypt = false){
    const {ctx} = this
    let payload = req
    if(encrypt){
      payload = ctx.helper.todes(req,ctx)
    }
    const data = await this.ctx.curl(url,{
      method: method,
      headers: '',
      gzip: false,
      data: payload,
      timeout: ctx.app.config.llpath.curlTimeOut,
    })
    let res = ctx.helper.bufferToJSON(data.data)
    if(encrypt){
      res = JSON.parse(ctx.helper.dedes(res,ctx))
    }
    const thislogger = {
      url:ctx.request.url,
      method:method,
      request:req,
      response:res,
      date:moment().format('YYYY-MM-DD HH:mm:ss'),
      useragent:ctx.request.header['user-agent']
    }
    ctx.getLogger('curlLogger').info('lianlian-API',JSON.stringify(thislogger))
    return res
  }
}

module.exports = MycurlService
