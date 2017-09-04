define([
	"env"
], function (
	Env
	) {
	var AccountCollection = Backbone.Collection.extend({
		"contentType": "application/json",
		"url": Env.url + "/account/" + localStorage.account_username
	});

	return AccountCollection;
});
