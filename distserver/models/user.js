'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: String
});

exports.default = mongoose.model('User', UserSchema);