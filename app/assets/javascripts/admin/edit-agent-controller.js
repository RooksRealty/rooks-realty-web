var app = angular.module('editAgent',['ui.bootstrap', 'services']);

app.controller('EditAgentController', ['$scope', '$modalInstance', '$upload', 'agent', 'RealtorService', 'Realtors',
	function ($scope, $modalInstance, $upload, agent, RealtorService, Realtors) {
		$scope.realtor = agent;

		$scope.update = function () {
			if($scope.agentForm.$valid) {
				RealtorService.update($scope.realtor, function() {
					if($scope.temp_file) {
						$scope.upload($scope.temp_file, $scope.realtor.id);
					}
		            $modalInstance.close();
		          }, function (error) {
		            console.log(error);
		          });
			}
		};

		$scope.create = function () {
			if($scope.agentForm.$valid) {
				Realtors.create({realtor: $scope.realtor}, function () {
	              $modalInstance.close();
	            }, function (error) {
	              console.log(error);
	            });
			}
		};

		$scope.removeAgent = function (realtorId) {
			var response = confirm("Are you sure you want to remove this agent?");
			if (response == true) {
			    RealtorService.delete({ id: realtorId }, function () {
		        	$modalInstance.dismiss();
		        });
			}
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.setFile = function (files) {
			$scope.temp_file = files[0];
		};

		$scope.upload = function(file, id) {
	      $scope.upload = $upload.upload({
	          url: 'admin/realtor/image/upload/' + id + '.json', 
	          file: file
	      }).progress(function(evt) {
	         console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	      }).success(function(data, status, headers, config) {
	         console.log(data);
	      });
		};
	}
]);