'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackConfig = require('../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodbUri = require('mongodb-uri');

var _mongodbUri2 = _interopRequireDefault(_mongodbUri);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _authConfig = require('./authConfig');

var _authConfig2 = _interopRequireDefault(_authConfig);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRoutes = _express2.default.Router();
_mongoose2.default.Promise = global.Promise;
var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost/pfl';
var mongooseUri = _mongodbUri2.default.formatMongoose(mongodbUri);
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
_mongoose2.default.connect(mongooseUri, options);

var port = process.env.PORT || 3000;
var app = (0, _express2.default)();
var PROD = process.env.NODE_ENV === 'production';

app.set('superSecret', _authConfig2.default.secret);
var compiler = (0, _webpack2.default)(_webpackConfig2.default);

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(_express2.default.static('public'));

if (PROD) {
  app.use('/', _express2.default.static('dist'));
} else {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: _webpackConfig2.default.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use((0, _morgan2.default)('dev'));
}

app.post('/newuser', function (req, res, next) {
  var user = new _user2.default({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    pflUser: req.body.pflUser,
    pflPass: _passwordHash2.default.generate(req.body.pflPass)
  });
  user.save(function (err) {
    if (err) {
      next(err);
    } else {
      console.log('User saved successfully');
      res.json({ success: true, user: user });
    }
  });
});
apiRoutes.post('/authenticate', function (req, res, next) {
  _user2.default.findOne({
    pflUser: req.body.pflUser
  }, function (err, user) {
    if (err) {
      next(err);
    } else if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      console.log(req.body.pflUser, req.body.pflPass, user);
      if (!_passwordHash2.default.verify(req.body.pflPass, user.pflPass)) {
        res.json({ success: false, message: 'Authentication failed. Incorrect password.' });
      } else {
        var token = _jsonwebtoken2.default.sign(user, app.get('superSecret'), {
          expiresIn: 1440
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          userId: user._id,
          firstName: user.firstName
        });
      }
    }
  });
});
apiRoutes.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    _jsonwebtoken2.default.verify(token, app.get('superSecret'), function (err, decoded) {
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
apiRoutes.get('/', function (req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});
apiRoutes.get('/users', function (req, res) {
  _user2.default.find({}, function (err, users) {
    res.json(users);
  });
});
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../public/index.html'));
});

app.use('/api', apiRoutes);

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else if (!PROD) {
    console.log(('Starting app in dev mode, listening on port ' + port).green);
    (0, _open2.default)('http://localhost:' + port);
  } else {
    console.log('Starting app in production mode, listening on port ' + port);
  }
});