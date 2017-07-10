var mongoose = require('mongoose');
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  local: {
    name: String,
    username: String,
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    username: String,
  },
  });

var Faceb

  Account.plugin(passportLocalMongoose);

  module.exports = mongoose.model('Account', Account);
