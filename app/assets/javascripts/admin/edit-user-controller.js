var app = angular.module('editUser',['ui.bootstrap', 'services']);

app.controller('EditUserController', ['$scope', '$modalInstance', 'user', 'Users',
	function ($scope, $modalInstance, user, Users) {
		$scope.user = user;

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.create = function () {
			if($scope.userForm.$valid) {
				Users.create({user: $scope.user}, function () {
	              $modalInstance.close();
	            }, function (error) {
	              console.log(error);
	            });
			}
		};
	}
]);