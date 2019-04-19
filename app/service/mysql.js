const Service = require('egg').Service

class MysqlService extends Service {
  
  async create(payload) {
    payload.addtime = this.app.mysql.literals.now
    const result = await this.app.mysql.insert('test',payload)
    return result
  }

 
  async remove(id) {
    const { ctx, service } = this
    const role = await this.find(id)
    if (!role) {
      ctx.throw(404, 'not found')
    }
    return this.app.mysql.delete('test', {id})
  }

  
  async update(id, payload) {
    const { ctx, service } = this
    const role = await this.find(id)
    if (!role) {
      ctx.throw(404, 'not found')
    }
    const options = {id}
    const result = await this.app.mysql.update('test', payload, options)
  }
 
  async list() {
    let res = []
    let count = 0
    const results = await this.app.mysql.select('test', { 
      columns: ['id','name', 'tel', 'addtime'], 
      orders: [['id','desc']], 
      limit: 10, 
      offset: 0,
    })
    return { count: count, list: results }
  }

  
  async pagelist(payload) {
    const { currentPage, pageSize } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    res = await this.app.mysql.select('test',{
      orders: [['id','desc']],
      limit: Number(pageSize),
      offset: Number(currentPage - 1) * Number(pageSize)
    })
    count = await this.app.mysql.count('test')
    return { count: count, list: res, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }


  async find(id) {
    return this.app.mysql.get('test', { id })
  }

}

module.exports = MysqlService