var app = angular.module('info', ['services', 'ui.tinymce']);

app.controller('InfoController', ['$scope', 'InfoService',
	function ($scope, InfoService) {
		$scope.showAlert = false;
		$scope.alert = { msg: '', type: '' };
		$scope.helpers = Utilities.helpers;

		$scope.info = InfoService.getWebsiteInfo(function () {
			$scope.info.phone_number = $scope.helpers.formatPhoneNumber($scope.info.phone_number);
			$scope.info.fax = $scope.helpers.formatPhoneNumber($scope.info.fax); 
		});

		$scope.format = function (field) {
			$scope.info[field] = $scope.helpers.formatPhoneNumber($scope.info[field]);
		};

		$scope.update = function () {
			if($scope.infoForm.$valid) {
				InfoService.update($scope.info, function() {
					window.scrollTo(0, 0);
					$scope.alert.type = "success";
					$scope.alert.msg = "The company info has been successfully updated.";
					$scope.showAlert = true;
		          }, function (error) {
		            console.log(error);
		          });
			} else {
				window.scrollTo(0, 0);
				$scope.alert.type = 'danger';
				$scope.alert.msg = 'This form is not valid. Please fill in the required fields.';
				$scope.showAlert = true;
			}
		};

	}
]);