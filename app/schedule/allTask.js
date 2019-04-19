const Subscription = require('egg').Subscription
const moment = require('moment')
class AllTask extends Subscription {
  constructor(ctx){
    super(ctx)
  }
  static get schedule() {
    return {
      interval: '15s', 
      type: 'all', //all egg的所有worker都会执行此任务 worker只有一个worker执行
      disable: true,
      env: ['prod']
    }
  }

  async subscribe() {
    const time = moment().format('MMMM Do YYYY, h:mm:ss a')
    this.ctx.app.cache = time
    console.log('所有worker执行定时任务:' + time)
  }
}

module.exports = AllTask