const Controller = require('egg').Controller
const Jwt = require('jsonwebtoken')
class TestJWTController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  async login() {
    const {ctx, app, service} = this
    const payload = ctx.request.body || {}
    const res = await service.token.login(payload)
    this.ctx.cookies.set('mttoken', res.token, {
      httpOnly: true,
      signed: true,
      path: '/'
    })
    ctx.helper.success({ctx, res})
  }

  async get() {
    const {ctx, app} = this
    ctx.helper.success({ctx})
  }

}

module.exports = TestJWTController
