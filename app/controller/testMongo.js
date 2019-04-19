const Controller = require('egg').Controller

class TestMongoController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false },
      onceLimit: { type: 'string', required: true, allowEmpty: false },
      dayLimit: { type: 'string', required: true, allowEmpty: false },
      realName: { type: 'string', required: true, allowEmpty: false  },
      bankType: { type: 'string', required: true, allowEmpty: false  },
    }
    this.operRule = {
      id: { type: 'string', required: true, allowEmpty: false },
    }
  }

  async add() {
    const { ctx, service } = this
    ctx.validate(this.createRule)
    const payload = ctx.request.body || {}
    const res = await service.mongo.create(payload)
    ctx.helper.success({ctx, res})
  }

  async update() {
    const { ctx, service } = this
    ctx.validate(this.operRule)
    const payload = ctx.request.body
    const res = await service.mongo.update(payload.id, payload)
    ctx.helper.success({ctx})
  }

  async remove() {
    const { ctx, service } = this
    ctx.validate(this.operRule)
    const {id} = ctx.request.body
    const res = await service.mongo.remove(id)
    ctx.helper.success({ctx})
  }

  async findOne() {
    const { ctx, service } = this
    const { id } = ctx.params
    const res = await service.mongo.find(id)
    ctx.helper.success({ctx, res})
  }

  async list() {
    const { ctx, service } = this
    let res = await service.mongo.list()
    ctx.helper.success({ctx, res})
  }

  async pagelist() {
    const { ctx, service } = this
    let res = await service.mongo.pagelist(ctx.params)
    ctx.helper.success({ctx, res})
  }

}

module.exports = TestMongoController
