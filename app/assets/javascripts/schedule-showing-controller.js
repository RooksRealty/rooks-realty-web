var app = angular.module('schedule-showing', ['services']);

app.controller('ScheduleShowingController', ['$scope', '$modalInstance', 'listing',
	function ($scope, $modalInstance, listing) {
		$scope.listing = listing;

		$scope.cancel = function () {
			$modalInstance.dismiss()
		};

		$scope.submit = function () {

		};
	}

]);