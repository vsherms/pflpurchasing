'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var WheelSchema = new mongoose.Schema({
  date: Date,
  segs: [{
    value: String,
    score: Number
  }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

exports.default = mongoose.model('Wheel', WheelSchema);