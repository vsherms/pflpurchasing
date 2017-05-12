'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  pflUser: String,
  pflPass: String
});

exports.default = mongoose.model('User', UserSchema);