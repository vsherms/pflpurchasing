const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  pflUser: String,
  pflPass: String
});

export default mongoose.model('User', UserSchema);
