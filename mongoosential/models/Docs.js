const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Docs', Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}))