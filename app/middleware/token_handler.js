'use strict'

module.exports = (options) => {  // 若放到线上中间要加入redis做中转验证
  const Jwt = require('jsonwebtoken')
  return async function (ctx, next) {
    const config = options.config
    const delUrl = options.urlMatch
    if(ctx.request.url.indexOf(delUrl) !== -1 && ctx.request.url.indexOf('login') === -1 && ctx.request.url.indexOf('logout') === -1 ){
      if (ctx.request.header['x-csrf-token']) {
        const user = ctx.helper.getToken(ctx.request.header['x-csrf-token'])
        let token = ctx.request.header['x-csrf-token'].split(' ')[1]
        let decoded
        try {
          decoded = Jwt.verify(token, config.key)
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            token = Jwt.sign({
              user_id: user.user_id,
              user_name: user.user_name
            }, config.key, {
              expiresIn: config.tokenTime
            })
            ctx.cookies.set('token', token, {
              maxAge: config.cookiesTime,
              httpOnly: true,
              overwrite: true,
              signed: true
            })
          } else {
            ctx.status = 200
            ctx.body = {
              code:401,
              message: '信息失效，请登录'
            }
            return
          }
        }
        ctx.cookies.set('token', token, {
          maxAge: config.cookiesTime,
          httpOnly: true,
          overwrite: true,
          signed: true
        })
        await next()
      } else {
        ctx.status = 200
        ctx.body = {
          code:401,
          message: '请登录'
        }
        return
      }
    }else{
      await next()
    }
  }
}