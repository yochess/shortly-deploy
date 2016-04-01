// var db = require('../config');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

  // var Url = mongoose.model('Url', urls);

  // var users = new mongoose.Schema({
  //   id: Number, //primary key?
  //   username: String,
  //   password: String,
  //   //timestamp?
  // });

  // var Users = mongoose.model('Users', users);
  // module.exports = User;


var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: Number, //primary key?
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  //timestamp??
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;
