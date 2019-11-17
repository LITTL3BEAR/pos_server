const Schema = require('mongoose').Schema;
const mongooseModel = require('mongoose').model

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdTime: { type: Date, required: true },
  updatedTime: { type: Date, required: true },
  status: { type: String, enum: ['available', 'removed'], required: true },
})

module.exports = mongooseModel('users', UserSchema)