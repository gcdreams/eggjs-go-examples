# eggjs-go-examples

node API实例基础库，基于Egg.js，用于快速集成开发前后端分离的服务端。
涵盖mysql、redis、mongodb、Mock数据服务&生成文档、服务器渲染（ejs）、curl、定时任务、RESTful接口开发、文件上传、单元测试、token验证、数据加密、日志定制等



### QuickStart

```bash
$ mkdir myegg & cd myegg
$ npm i
$ npm install apidoc -g
$ npm run local
$ open http://localhost:7001/
```

### Development

```bash
$ npm run local             //启动local环境
$ npm run uat               //启动uat测试环境
$ npm run prod              //启动生产环境
$ npm run stage             //启动stage环境
$ npm stop                  //停止服务
$ npm run document          //生产API文档
$ npm run test              //单元测试 mocha
```
### 链接数据库 (mysql, mongoDB, redis)
```bash
参见 ./app/router.js
其中包含操作实例,包含mysql, mongoDB增删改查及分页请求；redis设置读取
启动步骤：
1、./config/plugin.js 将对应插件的enable设置为true
2、./config/config.defaule.js 配置连接信息 
```
mongoDB API参见 [mongoosejs]

mysql API参见 [egg-mysql] API较少不能满足可使用 app.mysql.query(sql, values); 

### 生产mock数据及生产API文档
```bash
参见 ./app/router.js 
参见 ./app/controller/testMock.js 其中包含Mockjs、apidocs实例
npm run document //生成文档 生成apidoc文件夹
```
mockjs 规则参见 [mockjs]

apidoc 规则参见 [apidoc]

### token生成及验证
```bash
参见 ./app/router.js 
参见 ./app/controller/testJWT.js 
实例包含：登录获取token，通过中间件token_handler.js 验证
PS：中间件启用模式为通过自定义URL识别 见config文件
    中间件相关文档可见eggjs官方文档
```
### curl
```bash
参见 ./app/router.js 
参见 ./app/controller/testCURL.js 
参见 ./app/service/mycurl.js 
实例包含：明文请求&DES3加密请求，DES3密钥可在config中设置 
```

### 日志
```bash
参见 ./app/service/mycurl.js 
eggjs启动后自动生成日志，日志位置./logs
PS: 自定义日志，开启方式见./config/config.defaule.js ，在curl实例中包含自定义日志的生成方式
```

### 数据加密
```bash
参见 ./app/extend/helper.js 
实例包含：md5 + DES3加密解密
```
### 静态文件管理
```bash
参见./config/config.defaule.js中config.static
```

### 图片上传
```bash
参见 ./app/controller/testUpload.js 
实例包含：单个文件及多个文件上传 适用UI为antd & antd-m
```
### 定时任务
```bash
参见 ./app/schedule/..
实例包含：启动单一worker定时任务及所有worker定时任务，定时任务启动时机可根据业务或在./app.js中根据生命周期启动
```
### 单元测试
```bash
参见 ./app/test/..
实例包含：eslint检测及token验证的单元测试 ，单元测试使用mocha
npm run test //运行单元测试 首先会检测eslint
```

### restful
```bash
参见 ./app/router.js 
```
### 服务器渲染（ejs）
```bash
参见 ./app/controller/home.js
实例包含：通过ejs模板渲染页面
```
### websocket 
```bash
下版本待续
```

[egg]: https://eggjs.org
[mockjs]: http://mockjs.com/examples.html
[apidoc]: http://apidocjs.com/
[mongoosejs]:https://mongoosejs.com/docs/api.html
[egg-mysql]:https://www.npmjs.com/package/egg-mysql
