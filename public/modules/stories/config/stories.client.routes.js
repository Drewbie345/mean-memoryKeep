'use strict';

// Setting up route
angular.module('stories').config(['$stateProvider',
	function($stateProvider) {
		// stories state routing
		$stateProvider.
		state('listStories', {
			url: '/stories',
			templateUrl: 'modules/stories/views/list-stories.client.view.html'
		}).
		state('createStory', {
			url: '/stories/create',
			templateUrl: 'modules/stories/views/create-Story.client.view.html'
		}).
		state('viewStory', {
			url: '/stories/:StoryId',
			templateUrl: 'modules/stories/views/view-Story.client.view.html'
		}).
		state('editStory', {
			url: '/stories/:StoryId/edit',
			templateUrl: 'modules/stories/views/edit-Story.client.view.html'
		});
	}
]);