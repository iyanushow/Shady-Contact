const mongoose = require('mongoose');

// DEFINE USER DB SCHEMA
const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  phoneNo: {
    type: String,
  },
  type: {
    type: String,
    default: 'personal',
  },
});

module.exports = mongoose.model('contact', ContactSchema);
