# Hoodie Pluging User Data

A plugin that only extends the frontend Hoodie API
with `hoodie.userData` object. It's a temporary
workaround until the ability to manage user data
lands in Hoodie core. Follow status at:
https://github.com/hoodiehq/discussion/issues/47

## API

```js
// load user data from server
hoodie.userData.fetch()
  .done( showUserData )
  .fail( handleError )

// update user data on server
hoodie.userData.update( changedProperties)
  .done( showNewUserData )
  .fail( handleError )
```

Note that user data is not cached, it's always
fetched and updated right in the `_users/` document.
