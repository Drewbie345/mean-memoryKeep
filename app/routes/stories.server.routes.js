'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	stories = require('../../app/controllers/stories');

module.exports = function(app) {
	// Article Routes
	app.route('/stories')
		.get(stories.list)
		.post(users.requiresLogin, stories.create);

	app.route('/stories/:storyId')
		.get(stories.read)
		.put(users.requiresLogin, stories.hasAuthorization, stories.update)
		.delete(users.requiresLogin, stories.hasAuthorization, stories.delete);

	// Finish by binding the article middleware
	app.param('storyId', stories.storyByID);
};