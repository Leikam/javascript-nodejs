var User = require('users').User;
var jade = require('lib/serverJade');
var path = require('path');
var config = require('config');

// Remove provider profile from the user
exports.post = function* (next) {

  var user = this.user;

  for (var i = 0; i < user.providers.length; i++) {
    var provider = user.providers[i];
    if (provider.name == this.params.providerName) {
      provider.remove();
      i--;
    }
  }

  yield user.persist();

  this.body = '';
};
