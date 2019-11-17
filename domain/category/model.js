const Schema = require('mongoose').Schema;
const mongooseModel = require('mongoose').model

const CategorySchema = new Schema({
  name: { type: String, required: true },
  createdTime: { type: Date, required: true },
  updatedTime: { type: Date, required: true },
  status: { type: String, enum: ['available', 'removed'], required: true },
})

module.exports = mongooseModel('categorys', CategorySchema)