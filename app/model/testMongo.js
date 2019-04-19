module.exports = app => {
  const mongoose = app.mongoose
  const TestMongoSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    realName: { type: String, unique: true, required: true },
    onceLimit: { type: Number, required: true, default: 1 },
    dayLimit: { type: Number, required: true, default: 1 },
    ifShow: { type: Boolean, default: true },
    flag: { type: Boolean, default: true },
    bankType: { type: String, unique: true, required: true },
    ifQuick: { type: Boolean, default: true },
    desc:{type: String,default: ''},
    image:{type: String,default: ''},
    bankId:{type: Number , default: 0},
    createdAt: { type: Date, default: Date.now }
  })
  return mongoose.model('Testmongo', TestMongoSchema)
}