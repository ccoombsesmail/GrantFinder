const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GrantSchema = new Schema({
  grant_title: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
})



module.exports = Grant = mongoose.model('Grant', GrantSchema);
