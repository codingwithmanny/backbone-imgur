define([
  'router'
],
function (
  Router
) {
  var oldSync = Backbone.sync;

  Backbone.sync = function(method, model, options) {
    console.log('Backbone.sync');
    console.log('model', model);

    options = options || {};
    options.beforeSend = function(xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.access_token);
    };
    options.modelContext = model;
    return oldSync.call(Backbone, method, model, options);
  }

  var App = function () {
    var router = new Router();
  }
  return App;
});
