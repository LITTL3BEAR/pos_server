const Schema = require('mongoose').Schema;
const mongooseModel = require('mongoose').model

const ProductSchema = new Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'categorys', require: true },
  createdTime: { type: Date, required: true },
  updatedTime: { type: Date, required: true },
  status: { type: String, enum: ['available', 'removed'], required: true },
})

module.exports = mongooseModel('products', ProductSchema)
