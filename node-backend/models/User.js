// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  simplifiedText: {
    type: String,
  },
  flowchart: { type: String },
  preferences: {
    font: { type: String, default: 'opendyslexic' },
    darkMode: { type: Boolean, default: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
