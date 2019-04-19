'use strict'
module.exports = app => {
  const { router, controller } = app
  //输出页面 && ejs模板输出
  router.get('/', controller.home.index) 
  //生成Mock数据
  router.get('/api/testMock', controller.testMock.index) 
  //操作mongoDB
  router.post('/api/testMongo/add', controller.testMongo.add) //插入记录
  router.get('/api/testMongo/list', controller.testMongo.list) //读取记录
  router.put('/api/testMongo/update', controller.testMongo.update) //更新记录
  router.delete('/api/testMongo/remove', controller.testMongo.remove) //删除记录
  router.get('/api/testMongo/find/:id', controller.testMongo.findOne) //获取某条记录
  router.get('/api/testMongo/pagelist/:currentPage/:pageSize', controller.testMongo.pagelist) //获取分页记录
  //操作mysql
  router.post('/api/testMysql/add', controller.testMysql.add) //插入记录
  router.get('/api/testMysql/list', controller.testMysql.list) //读取记录
  router.put('/api/testMysql/update', controller.testMysql.update) //更新记录
  router.delete('/api/testMysql/remove', controller.testMysql.remove) //删除记录
  router.get('/api/testMysql/find/:id', controller.testMysql.findOne) //获取某条记录
  router.get('/api/testMysql/pagelist/:currentPage/:pageSize', controller.testMysql.pagelist) //获取分页记录
  //操作redis
  router.get('/api/testRedis/set', controller.testRedis.set) //生成token 设置redis
  router.get('/api/testRedis/get', controller.testRedis.get) //获取redis
  //token验证
  router.post('/api/testJWT/login', controller.testJWT.login) 
  router.get('/api/testJWT/get', controller.testJWT.get)  //中间件token_handler 校验请求头x-csrf-token中携带的token
  //curl & 日志 logger 
  router.get('/api/testCURL/get', controller.testCURL.get)
  router.post('/api/testCURL/post', controller.testCURL.post)
  //MD5 & DES3
  router.get('/api/testCrypto/get', controller.testCrypto.get)
  //antd/antd M 上传接口
  router.post('/api/inner/upload', controller.testUpload.create) //上传单个文件 
  router.post('/api/inner/upload', controller.testUpload.multiple) //上传多个文件 
  //Web Socket
}
