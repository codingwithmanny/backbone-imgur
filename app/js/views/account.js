define([
  'collections/account',
  'text!templates/account.html'
],
function (
  AccountCollection,
  AccountView
) {
  var AccountView = Backbone.View.extend({
    el: $('#root'),
    collection: new AccountCollection(),
    template: _.template(AccountView),
    initialize: function () {
      var that = this;
      this.render({ item: {} });

      this.collection.fetch({
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Client-ID', '7743f6034887d14');
        },
        success: function(collection, response) {
          that.render({ item: response.data });
        }
      });

      console.log('AccountView init');
    },
    render: function (item) {
      this.$el.html(this.template(item));
    }
  });
  return AccountView;
});
