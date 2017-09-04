define([
  'collections/photos',
  'text!templates/photos.html'
],
function (
  PhotosCollection,
  PhotosView
) {
  var PhotosView = Backbone.View.extend({
    el: $('#root'),
    collection: new PhotosCollection(),
    template: _.template(PhotosView),
    initialize: function () {
      var that = this;
      this.render({ items: [] });

      this.collection.fetch({
        success: function(collection, response) {
          that.render({ items: response.data });
        }
      })

      console.log('PhotosView init');

    },
    render: function (photos) {
      this.$el.html(this.template(photos));
    }
  });
  return PhotosView;
});
