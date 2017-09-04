define([
  'text!templates/login.html'
],
function (
  Login
) {
  var LoginView = Backbone.View.extend({
    el: $('#root'),
    template: _.template(Login),
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(this.template());
    }
  });
  return LoginView;
});
