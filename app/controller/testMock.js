const Controller = require('egg').Controller
const Mock = require('mockjs')
//定义公共文档信息可公用

/**
 * @apiDefine MyError
 * @apiError MyError 找不到相关数据
 * @apiErrorExample MyError-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *           "code": 404,
 *           "msg": "",
 *           "path" ""
 *       }
 *     }
 * 
 */

/**
 * @apiDefine MyAuth
 * @apiError MyAuth token无效
 * @apiErrorExample MyAuth-Response:
 *     HTTP/1.1 401 Not Auth
 *     {
 *       "error": {
 *           "code": 401,
 *           "msg": "",
 *           "path" ""
 *       }
 *     }
 */

/**
 * @apiDefine MyHeader
 * @apiHeader {String} Authorization 用户授权token
 * @apiHeader {String} myid 编码
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOjM2NzgsImF1ZGllbmNlIjoid2ViIiwib3BlbkFJZCI6MTM2NywiY3JlYXRlZCI6MTUzMzg3OTM2ODA0Nywicm9sZXMiOiJVU0VSIiwiZXhwIjoxNTM0NDg0MTY4fQ.Gl5L-NpuwhjuPXFuhPax8ak5c64skjDTCBC64N_QdKQ2VT-zZeceuzXB9TqaYJuhkwNYEhrV3pUx1zhMWG7Org",
 *       "myid": "cnE="
 *     }
 */

//定义某个API文档信息
/**
 * @apiVersion 1.1.0
 * @apiName getList
 * @apiGroup Test
 * @api {get} /api/testMock 获取信息
 * @apiUse MyHeader
 * @apiParam {Number} id 编号
 *
 * @apiSuccess {Number} totalCompensation 总款
 * @apiSuccess {Number} amountToBeRepaid 代偿款
 * @apiSuccess {String} recentPaymentDate 代偿时间(yyyy-MM-dd HH:mm:ss)
 * @apiSuccess {Object[]} orderList 列表
 * @apiSuccess {Number}   profiles.orderId   ID.
 * @apiSuccess {Number}   profiles.orderAmount   金额.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "totalCompensation": 3268.58,
 *       "amountToBeRepaid": 2367.15,
 *       "recentPaymentDate": "1973-07-29 08:53:08",
 *       "orderList":[
 *          {
 *           "orderId" : 1
 *           "orderAmount" : 1.00
 *          }
 *        ]
 *     }
 *
 * @apiUse MyError
 * @apiUse MyAuth
 */
class TestMockController extends Controller {
  constructor(ctx) {
    super(ctx)
  }
  async index() {
    const { ctx } = this
    const res =  Mock.mock({
      'totalCompensation|1-10000.2':1,
      'amountToBeRepaid|1-10000.2':1,
      'recentPaymentDate':Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      'orderList|10': [{
        'orderId':'@word(10)',
        'protocalId':'@word(10)',
        'type|0-1':1,
        'orderAmount|1-10000.2': 1,
        'orderCreateTime': Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
        'orderAmountToBeRepaid|1-10000.2':1,
        'dueDate':Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
        'state|0-2':1
      }]
    })
    ctx.helper.success({ctx , res })
  }
}

module.exports = TestMockController
