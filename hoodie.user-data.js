Hoodie.extend(function (hoodie/*, lib, utils*/) {
  'use strict';

  function fetchUserData() {
    return hoodie.account.fetch().then(function(userDoc) {
      return userDoc.userData || {};
    });
  }
  function updateUserData(changedProperties) {
    return hoodie.account.fetch().then(function(userDoc) {
      var key;
      if (! userDoc.userData) {
        userDoc.userData = {};
      }
      for (key in changedProperties) {
        if (changedProperties.hasOwnProperty(key)) {
          userDoc.userData[key] = changedProperties[key];
        }
      }

      return hoodie.request('PUT', getUserDocPath(), {
        data: JSON.stringify(userDoc),
        contentType: 'application/json'
      }).then(function() {
        return userDoc.userData;
      });
    });

  }

  function getUserDocPath () {
    var username = hoodie.account.username;
    return '/_users/' + encodeURIComponent('org.couchdb.user:user/'+username);
  }

  // extend the hoodie.js API
  hoodie.userData = {
    fetch: fetchUserData,
    update: updateUserData
  };
});
