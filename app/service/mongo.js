const Service = require('egg').Service

class MongoService extends Service {
  
  async create(payload) {
    return this.ctx.model.TestMongo.create(payload)
  }

 
  async remove(id) {
    const { ctx, service } = this
    const role = await this.find(id)
    if (!role) {
      ctx.throw(404, 'not found')
    }
    return ctx.model.TestMongo.findByIdAndRemove(id)
  }

  
  async update(id, payload) {
    console.log(id)
    const { ctx, service } = this
    const role = await this.find(id)
    if (!role) {
      ctx.throw(404, 'not found')
    }
    return ctx.model.TestMongo.findByIdAndUpdate(id, payload)
  }
 
  async list() {
    let res = []
    let count = 0
    res = await this.ctx.model.TestMongo.find({ifShow: true}).sort({ _id: 1 }).exec()
    count = res.length
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })
    return { count: count, list: data }
  }

  
  async pagelist(payload) {
    const { currentPage, pageSize, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(search) {
      res = await this.ctx.model.TestMongo.find({name: { $regex: search } }).skip(skip).limit(Number(pageSize)).sort({ _id: 1 }).exec()
      count = res.length
    } else {
      res = await this.ctx.model.TestMongo.find({}).skip(skip).limit(Number(pageSize)).sort({ _id: 1 }).exec()
      count = await this.ctx.model.TestMongo.count({}).exec()
    }
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }


  async removes(values) {
    return this.ctx.model.TestMongo.remove({ _id: { $in: values } })
  }


  async find(id) {
    return this.ctx.model.TestMongo.findById(id)
  }

}

module.exports = MongoService