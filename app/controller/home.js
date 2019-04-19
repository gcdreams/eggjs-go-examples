const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const title = {
      name: 'Egg-go',
      content: '链链前端 node API基础库，基于Egg.js，用于快速集成开发BFF端。<br/>created by gaochao.'
    }
    await this.ctx.render('index/index',{
      title: title
    })
  }
}

module.exports = HomeController
