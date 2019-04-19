const Controller = require('egg').Controller

class TestMysqlController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      tel: { type: 'string', required: true, allowEmpty: false },
    }
    this.operRule = {
      id: { type: 'string', required: true, allowEmpty: false },
    }
  }

  async add() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const res = await service.mysql.create(payload)
    ctx.helper.success({ctx})
  }

  async update() {
    const { ctx, service } = this
    ctx.validate(this.operRule)
    const payload = ctx.request.body
    const res = await service.mysql.update(Number(payload.id), payload)
    ctx.helper.success({ctx})
  }

  async remove() {
    const { ctx, service } = this
    ctx.validate(this.operRule)
    const payload = ctx.request.body
    const res = await service.mysql.remove(Number(payload.id))
    ctx.helper.success({ctx})
  }

  async findOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.mysql.find(Number(id))
    ctx.helper.success({ctx, res})
  }

  async list() {
    const { ctx, service } = this
    let res = await service.mysql.list()
    ctx.helper.success({ctx, res})
  }

  async pagelist() {
    const { ctx, service } = this
    let res = await service.mysql.pagelist(ctx.params)
    ctx.helper.success({ctx, res})
  }

}

module.exports = TestMysqlController
