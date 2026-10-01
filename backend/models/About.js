const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  experience: {
    type: String,
    default: ''
  },
  patientsTreated: {
    type: String,
    default: ''
  },
  photoUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);