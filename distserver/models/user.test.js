'use strict';

var _chai = require('chai');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('userSchema', function () {
  it('can have a first and last name', function (done) {
    var user = new _user2.default();
    user.firstName = "Andy";
    user.lastName = "Burns";
    user.validate(function (error, u) {
      (0, _chai.expect)(error).to.not.exist;
      done();
    });
  });
});