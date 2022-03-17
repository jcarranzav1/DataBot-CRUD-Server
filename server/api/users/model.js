const mongoose = require('mongoose');

const fields = {
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
  email: {
    type: String,
    required: [true, 'Write the email, please'],
    trim: true,
    maxLength: 256,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 128,
  },
  phone: {
    type: Number,
    trim: true,
    minLength: 6,
    maxLength: 9,
  },
};
const users = new mongoose.Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

users
  .virtual('fullname')
  .get(function getFullname() {
    return `${this.name} ${this.lastName}`;
  })
  .set(function setFullname(value) {
    const [name = '', lastname = ''] = value.split(' ');
    this.name = name;
    this.lastname = lastname;
  });

const userModel = mongoose.model('users', users);

module.exports = userModel;
