const Controller = require('egg').Controller
class TestCURLController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  async get() {
    const {ctx, service} = this
    const res = await service.mycurl.curlall(ctx.app.config.llpath.curlUrl + 'api/?version=v1', 'GET' , {})
    ctx.helper.success({ctx, res})
  }

  async post() {
    const {ctx, service} = this
    const payload = ctx.request.body || {}
    const res = await service.mycurl.curlall(ctx.app.config.llpath.curlUrl + 'api/?version=v1', 'POST' , payload)
    ctx.helper.success({ctx, res})
  }
}

module.exports = TestCURLController
