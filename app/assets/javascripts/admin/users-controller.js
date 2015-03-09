var app = angular.module('users',['ui.bootstrap', 'services', 'editUser']);

app.controller('UsersController', ['$scope', '$modal', 'Users', 'UserService',
	function ($scope, $modal, Users, UserService) {
		$scope.loading = true;

		$scope.init = function () {
			$scope.users = Users.query(function () {
				$scope.loading = false;
			});
		};

		$scope.openModal = function (currentUser) {
      		var modalInstance = $modal.open({
		      templateUrl: 'edit-user.html',
		      controller: 'EditUserController',
		      size: 'lg',
		      resolve: {
		        user: function () {
		          return currentUser;
		        }
		      }
		    });

		    modalInstance.result.then(function () {
			  $scope.loading = true;
			  $scope.init();
		    }, function () {
			  $scope.init();
		    });
      	};

      	$scope.removeUser = function(userId) {
      		var response = confirm("Are you sure you want to remove this user?");
			if (response == true) {
			    UserService.delete({ id: userId }, function () {
		        	$scope.init();
		        });
			}
      	};

      	$scope.init();
	}
]);