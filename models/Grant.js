const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
  tag: {
    type: String,
    required: true
  }
})



const GrantSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  paymentDetails: {
    type: String,
    required: false
  },
  maxAward: {
    type: Number,
    required: false
  },
  currency: {
    type: String,
    required: false
  },
  deadline: {
    type: Date,
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
  tags: [TagSchema]
}, {
  timestamps: true
})



module.exports = Grant = mongoose.model('Grant', GrantSchema);
