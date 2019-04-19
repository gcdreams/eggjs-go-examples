const assert = require('assert')
const mock = require('egg-mock')
//https://github.com/visionmedia/supertest#getting-started
describe('some test', () => {
  let app
  let token = 0
  before(() => {
    app = mock.app()
    return app.ready()
  })

  it('访问/应返回200', async () => {
    const result = await app.httpRequest()
      .get('/')
      .expect(200)
    return  await app.httpRequest()
      .get('/')
      .expect(200)  
  })

  it('访问/api/testJWT/login应返回200', async () => {
    return await app.httpRequest()
      .post('/api/testJWT/login')
      .type('form')
      .send({
        password: '1111111',
      })
      .expect(200)
      .then(response => {
        token = response.body.data.token
        assert.strictEqual(response.body.code, 0)
      })
  })

  it('访问/api/testJWT/get应返回200', async () => {
    return await app.httpRequest()
      .get('/api/testJWT/get')
      .set('x-csrf-token' , `token ${token}`)
      .expect(200)
      .then(response => {
        assert.strictEqual(response.body.code, 0)
      })
  })

})