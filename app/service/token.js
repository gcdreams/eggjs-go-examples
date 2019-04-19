'use strict'

const Service = require('egg').Service
const Jwt = require('jsonwebtoken')
class TokenService extends Service {
  async login(payload) {
    const { ctx, service ,app } = this
    const user = {id:1, userName:'gao', password: '111111'}
    if(!user){
      return {'status':'error','type':'account','currentAuthority':'guest'}
    }
    let verifyPsw = true
    if(!verifyPsw) {
      return {'status':'error','type':'account','currentAuthority':'guest','tips':'password'}
    }else{
      let token = Jwt.sign({
        user_id: user.id,
        user_name: user.userName
      }, app.config.jwtSet.key, {
        expiresIn: app.config.jwtSet.tokenTime
      })
      return {
        user: user,
        status: 'ok',
        type: 'account',
        currentAuthority: 'admin',
        token: token
      }
    }
  }
}

module.exports = TokenService
