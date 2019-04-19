const Controller = require('egg').Controller
const Jwt = require('jsonwebtoken')
class TestRedisController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  async get() {
    const {ctx, app} = this
    const str = 'I am handsome man!'
    const res = {
      string: str,
      md5: ctx.helper.tomd5(str), 
      des3: ctx.helper.todes(str, ctx),
      des3ToString: ctx.helper.dedes(ctx.helper.todes(str, ctx), ctx)
    }
    ctx.helper.success({ctx, res})
  }

}

module.exports = TestRedisController
