const mongoose = require('mongoose');

const qualificationCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['education', 'certification', 'experience', 'specialization'],
    required: true
  },
  institution: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('QualificationCard', qualificationCardSchema);