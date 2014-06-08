'use strict';

angular.module('stories').controller('storiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'stories',
	function($scope, $stateParams, $location, Authentication, stories) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var story = new stories({
				title: this.title,
				content: this.content
			});
			story.$save(function(response) {
				$location.path('stories/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.title = '';
			this.content = '';
		};

		$scope.remove = function(story) {
			if (story) {
				story.$remove();

				for (var i in $scope.stories) {
					if ($scope.stories[i] === story) {
						$scope.stories.splice(i, 1);
					}
				}
			} else {
				$scope.story.$remove(function() {
					$location.path('stories');
				});
			}
		};

		$scope.update = function() {
			var story = $scope.story;

			story.$update(function() {
				$location.path('stories/' + story._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.stories = stories.query();
		};

		$scope.findOne = function() {
			$scope.story = stories.get({
				storyId: $stateParams.storyId
			});
		};
	}
]);