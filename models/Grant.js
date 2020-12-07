const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GrantSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  links: {
    type: String,
    required: false
  },
  amount: {
    type: String,
    required: false
  },
  deadline: {
    type: String,
    required: false
  },
  disbursement: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  location_elig: {
    type: String,
    required: false
  },
  applicant_elig: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false
  }
}, {
  timestamps: true
})



module.exports = Grant = mongoose.model('Grant', GrantSchema);
