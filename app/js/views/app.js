define([
  'text!templates/app.html'
],
function (
  AppView
) {
  var AppView = Backbone.View.extend({
    el: $('#root'),
    template: _.template(AppView),
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.append(this.template());
    }
  });
  return AppView;
});
