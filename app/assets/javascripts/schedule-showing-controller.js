var app = angular.module('schedule-showing', ['services', 'ui.bootstrap']);

app.controller('ScheduleShowingController', ['$scope', '$modalInstance', 'listing', 'ShowingService',
	function ($scope, $modalInstance, listing, ShowingService) {
		$scope.listing = listing;
		$scope.showAlert = false;
		$scope.showOptions = false;
		$scope.alert = { msg: '' };

		$scope.cancel = function () {
			$modalInstance.dismiss()
		};

		$scope.submit = function () {
			if($scope.showingForm.$valid) {
				$scope.showing.mls = $scope.listing.mls;
				ShowingService.scheduleShowing({showing: $scope.showing}, function () {
	              $modalInstance.close();
	            }, function (error) {
	              console.log(error);
	            });
			} else {
				$scope.alert.msg = 'This form is not valid. Please fill in the required fields.';
				$scope.showAlert = true;
			}
		};

		$scope.formatPhoneNumber = function(phoneNumber) {
			if(phoneNumber) {
				var numbers = phoneNumber.replace(/\D/g, ''),
			        char = {0:'(',3:') ',6:'-'};
			    phoneNumber = '';
			    for (var i = 0; i < numbers.length; i++) {
			        phoneNumber += (char[i]||'') + numbers[i];
			    }
			    $scope.showing.phone_number = phoneNumber;
			}
		};
	}

]);