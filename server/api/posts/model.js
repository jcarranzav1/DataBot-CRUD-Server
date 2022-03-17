const mongoose = require('mongoose');

const fields = {
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
  age: {
    type: Number,
    default: 0,
  },
};

const users = new mongoose.Schema(fields, {
  timestamps: true,
});

const userModel = mongoose.model('users', users);

module.exports = userModel;
