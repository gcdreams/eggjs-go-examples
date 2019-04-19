const Controller = require('egg').Controller
const Jwt = require('jsonwebtoken')
class TestRedisController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  async set() {
    const {ctx, app} = this
    const {name} = ctx.params
    let token = Jwt.sign({
      user_id: 1,
      user_name:'gaochao'
    }, app.config.jwtSet.key, {
      expiresIn: app.config.jwtSet.tokenTime
    })
    const res = await app.redis.set('token', token, function(){
      app.redis.expire('token', 40) //TTL
    })
    if(res !== 'OK') {
      ctx.throw(500, 'not save')
    }
    ctx.helper.success({ctx})
  }

  async get() {
    const {ctx, app} = this
    const res = await app.redis.get('token')
    ctx.helper.success({ctx, res})
  }

}

module.exports = TestRedisController
