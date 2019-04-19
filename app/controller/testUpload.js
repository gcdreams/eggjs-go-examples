const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const download = require('image-downloader')

class testUploadController extends Controller {
  constructor (ctx){
    super(ctx)
  }

  async create() {
    const { ctx, service } = this
    const stream = await ctx.getFileStream()
    const mkdir = await ctx.helper.uploadmk(this)
    const filename = path.basename(stream.filename)
    const extname = path.extname(stream.filename).toLowerCase()
    const attachment = new this.ctx.model.Attachment
    attachment.extname = extname
    attachment.filename = filename
    attachment.url = `/${mkdir}/${attachment._id.toString()}${extname}`
    const target = path.join(this.config.baseDir, this.config.llpath.upload  + mkdir, `${attachment._id.toString()}${attachment.extname}`)
    const writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    // 调用 Service 进行业务处理
    const res = {}
    ctx.helper.success({ctx, res})
  }

  // 通过URL添加单个图片: 如果网络地址不合法，EGG会返回500错误
  async url() {
    const { ctx, service } = this
    const attachment = new this.ctx.model.Attachment
    const { url } = ctx.request.body
    const filename = path.basename(url)
    const extname = path.extname(url).toLowerCase()
    const options = {
      url: url,
      dest: path.join(this.config.baseDir, this.config.llpath.upload , `${attachment._id.toString()}${extname}`)
    }
    let res
    try {
      await download.image(options)
      attachment.extname = extname
      attachment.filename = filename
      attachment.url = `/${attachment._id.toString()}${extname}`
      // 调用 Service 进行业务处理
      res = {}
    } catch (err) {
      throw err
    }
    ctx.helper.success({ctx, res})
  }

  // 上传多个文件
  async multiple() {
    const { ctx, service } = this
    const parts = ctx.multipart()
    const res = {}
    const files = []
    let part
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是 filed
        console.log('field: ' + part[0])
        console.log('value: ' + part[1])
        console.log('valueTruncated: ' + part[2])
        console.log('fieldnameTruncated: ' + part[3])
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return
        }
        // part 是上传的文件流
        console.log('field: ' + part.fieldname)
        console.log('filename: ' + part.filename)
        console.log('extname: ' + part.extname)
        console.log('encoding: ' + part.encoding)
        console.log('mime: ' + part.mime)
        const filename = part.filename.toLowerCase()// 文件名称
        const extname = path.extname(part.filename).toLowerCase() // 文件扩展名称
        const attachment = new ctx.model.Attachment
        attachment.extname = extname
        attachment.filename = filename
        attachment.url = `/${attachment._id.toString()}${extname}`
        const target = path.join(this.config.baseDir, this.config.llpath.upload , `${attachment._id.toString()}${extname}`)
        const writeStream = fs.createWriteStream(target)
        let res
        try {
          await awaitWriteStream(part.pipe(writeStream))
          // 调用Service
          res = {}
        } catch (err) {
          await sendToWormhole(part)
          throw err
        }
        files.push(`${attachment._id}`)
      }
    }
    ctx.helper.success({ctx, res})
  }

}


module.exports = testUploadController