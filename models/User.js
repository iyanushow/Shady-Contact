const mongoose = require('mongoose');

// DEFINE USER DB SCHEMA
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  phoneNo: {
    type: Number,
    required: false,
  },
  avi: {
    type: String,
  },
});

module.exports = mongoose.model('user', UserSchema);
