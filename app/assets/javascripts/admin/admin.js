var app = angular.module('admin',
	['ngResource', 'ngRoute', 'editListing', 'editAgent', 'adminListings', 'adminAgents', 'users', 'info', 'directives']);

app.config(['$routeProvider',
	function($routeProvider) {
  		$routeProvider.
		    when('/dashboard/listings', {
		      templateUrl: '../views/admin/listings/listings.html',
		      controller: 'AdminListingsController'
		    }).
		    when('/dashboard/agents', {
		      templateUrl: '../views/admin/agents/agents.html',
		      controller: 'AdminAgentsController'
		    }).
		    when('/dashboard/users', {
		      templateUrl: '../views/admin/users/users.html',
		      controller: 'UsersController'
		    }).
		    when('/dashboard/website_info', {
		      templateUrl: '../views/admin/info/website_info.html',
		      controller: 'InfoController'
		    }).
		    otherwise({
		      redirectTo: '/dashboard/listings'
		    });
	}]);

app.controller('NavController', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function (path) {
	  return path === $location.path();
	};
}]);


