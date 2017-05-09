import {expect} from 'chai';
import User from './user';

describe('userSchema', () => {
  it('can have a first and last name', (done) => {
    let user = new User();
    user.firstName= "Andy";
    user.lastName= "Burns";
    user.validate((error, u) => {
      expect(error).to.not.exist;
      done();
    });
  });
});
