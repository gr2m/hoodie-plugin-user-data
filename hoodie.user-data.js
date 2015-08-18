Hoodie.extend(function (hoodie/*, lib, utils*/) {
  'use strict';

  function fetchUserData() {
    return hoodie.account.fetch().then(function(userDoc) {
      return userDoc.userData || {};
    });
  }
  function updateUserData(changedProperties, options) {
    var username;
    var path;
    if (!options) {
      options = {};
    }

    username = options.username || hoodie.account.username;
    path = getUserDocPath(options);

    delete options.username;
    return hoodie.request('GET', path, options).then(function(userDoc) {
      var key;
      if (! userDoc.userData) {
        userDoc.userData = {};
      }
      for (key in changedProperties) {
        if (changedProperties.hasOwnProperty(key)) {
          userDoc.userData[key] = changedProperties[key];
        }
      }

      options.data = JSON.stringify(userDoc);
      options.contentType = 'application/json';

      delete options.username;
      return hoodie.request('PUT', path, options).then(function() {
        return userDoc.userData;
      });
    });

  }

  function getUserDocPath (options) {
    var username = options.username || hoodie.account.username;
    return '/_users/' + encodeURIComponent('org.couchdb.user:user/'+username);
  }

  // extend the hoodie.js API
  hoodie.userData = {
    fetch: fetchUserData,
    update: updateUserData
  };
});
