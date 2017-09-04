define([
  'views/login',
  'views/photos',
  'views/account'
],
function (
  LoginView,
  PhotosView,
  AccountView
) {
  var Router = Backbone.Router.extend({
    // Callbacks for routes that are restricted and are to be checked
    restrictedRoutes: [
      "showHome",
      "showAccount"
    ],
    // Main middleware to handle if token has been set
    route: function (route, name, callback) {
      var router = this;
      var middleware = null;

      if (!callback) {
        callback = this[name];
      }

      if(router.restrictedRoutes.indexOf(name) > -1) {
        middleware = function() {
          // check if local storage is set
          if(_.isUndefined(localStorage.access_token)) {
            window.location.href = '#login';
            return false;
          }

          callback.apply(router, arguments);
        };
      } else if (name === "showLogin") {
        middleware = function() {
          if(localStorage.access_token) {
            window.location.href = '#';
            return false;
          }

          callback.apply(router, arguments);
        }
      }

      return Backbone.Router.prototype.route.call(this, route, name, middleware);
    },
    // Main routes of the application
    routes: {
      "": "showHome",
      "account": "showAccount",
      "login": "showLogin",
      "logout": "logOut",
      "*notFound": "notFound"
    },
    // helper function to retrieve the access tokens
    parseToken: function (hash) {
      var tokens = {};
      hash = hash.substring(1);
      hash = hash.split('&');
      hash.map(function (value, key) {
        tokens[value.split('=')[0]] = value.split('=')[1];
      });

      return tokens;
    },
    // Constructor
    initialize: function () {
      Backbone.history.start();
    },
    // Callback functions for routes
    showHome: function () {
      console.log('FUNC: showHome');
      var view = new PhotosView;
    },
    showAccount: function () {
      console.log('FUNC: showAccount');
      var view = new AccountView;
    },
    showLogin: function () {
      console.log('FUNC: showLogin');
      var view = new LoginView;
    },
    logOut: function () {
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('token_type');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('account_username');
      localStorage.removeItem('account_id');
      window.location.href = '#login';
    },
    notFound: function () {
      console.log('FUNC: notFound');
      var windowHash = window.location.hash;

      // if access token route, access the localStorage keys
      if(windowHash.indexOf('access_token') > -1) {
        windowHash = this.parseToken(windowHash);

        if(Object.keys(windowHash).length > 0) {
          Object.keys(windowHash).map(function (value, key) {
            localStorage.setItem(value, windowHash[value]);
          });

          window.location.href = '#';
        }
      }
    },
  });
  return Router;
});
