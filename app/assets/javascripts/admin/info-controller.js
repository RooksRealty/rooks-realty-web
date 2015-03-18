var app = angular.module('info', ['services', 'ui.tinymce']);

app.controller('InfoController', ['$scope', 'InfoService',
	function ($scope, InfoService) {
		$scope.showAlert = false;
		$scope.alert = { msg: '', type: '' };

		$scope.info = InfoService.getWebsiteInfo(function () {
			$scope.formatPhoneNumber($scope.info.phone_number, 'phone_number');
			$scope.formatPhoneNumber($scope.info.fax, 'fax'); 
		});

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

		$scope.formatPhoneNumber = function(phoneNumber, property) {
			if(phoneNumber) {
				var numbers = phoneNumber.replace(/\D/g, ''),
			        char = {0:'(',3:') ',6:'-'};
			    phoneNumber = '';
			    for (var i = 0; i < numbers.length; i++) {
			        phoneNumber += (char[i]||'') + numbers[i];
			    }
			    $scope.info[property] = phoneNumber;
			}
		};

	}
]);