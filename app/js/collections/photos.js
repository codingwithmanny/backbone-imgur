define([
	"env"
], function (
	Env
	) {
	var PhotosCollection = Backbone.Collection.extend({
		"contentType": "application/json",
		"url": Env.url + "/account/me/images/"
	});

	return PhotosCollection;
});
