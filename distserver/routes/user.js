'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoutes = _express2.default.Router();
var hash = require('password-hash');
var jwt = require('jsonwebtoken');
var authConfig = require('./authConfig');
var app = (0, _express2.default)();
app.set('superSecret', authConfig.secret);

app.post('/newuser', function (req, res) {
  var user = new _user2.default({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash.generate(req.body.password)
  });
  user.save(function (err) {
    if (err) throw err;
    // console.log('User saved successfully');
    res.json({ success: true, user: user });
  });
});

userRoutes.post('/authenticate', function (req, res) {
  _user2.default.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // console.log(req.body.username, req.body.password, user);
      if (!hash.verify(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Incorrect password.' });
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          userId: user._id
        });
      }
    }
  });
});

userRoutes.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

userRoutes.get('/', function (req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

userRoutes.get('/users', function (req, res) {
  _user2.default.find({}, function (err, users) {
    res.json(users);
  });
});

exports.default = userRoutes;