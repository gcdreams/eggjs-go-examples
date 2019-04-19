const Service = require('egg').Service

class RoleService extends Service {

  async index(params) {
    const { pageNo = 1, pageSize = 99, } = params
    const res = await this.ctx.model.User.find()
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .exec()
    const { formatTime } = this.ctx.helper
    let data = res.map((item) => {
      let obj = Object.assign({}, item._doc)
      obj.createDate = formatTime(item.createDate)
      return obj
    })
    return {
      count: res.length,
      list: data
    }
  }

  async create(params) {
    return this.ctx.model.User.create(params)
  }

  async update(params) {
    const id = params.id
    delete params.id
    return this.ctx.model.User.findByIdAndUpdate(id, params)
  }

  async removes(params) {
    return this.ctx.model.User.remove({ _id: { $in: params } })
  }
}

module.exports = RoleService
