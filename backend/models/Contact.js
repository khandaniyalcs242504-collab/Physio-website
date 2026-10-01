const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  phones: {
    type: [String],
    default: []
  },
  emails: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);  