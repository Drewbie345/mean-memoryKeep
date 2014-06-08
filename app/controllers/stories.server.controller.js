'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Story = mongoose.model('Story'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Story already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a article
 */
exports.create = function(req, res) {
	var article = new Story(req.body);
	story.user = req.user;

	story.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(story);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.jsonp(req.story);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var story = req.story;

	story = _.extend(story, req.body);

	story.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(story);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var story = req.story;

	story.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(story);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Story.find().sort('-created').populate('user', 'displayName').exec(function(err, stories) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(stories);
		}
	});
};

/**
 * Article middleware
 */
exports.storyByID = function(req, res, next, id) {
	Story.findById(id).populate('user', 'displayName').exec(function(err, story) {
		if (err) return next(err);
		if (!story) return next(new Error('Failed to load story ' + id));
		req.story = story;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.story.user.id !== req.user.id) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};