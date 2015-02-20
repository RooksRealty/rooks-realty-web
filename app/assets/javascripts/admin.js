var app = angular.module('rooksRealtyAdmin',['ngResource', 'ngRoute']);

app.config(["$httpProvider", function (provider) {
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
}]);

app.config(['$routeProvider',
	function($routeProvider) {
  		$routeProvider.
		    when('/dashboard', {
		      templateUrl: 'views/admin/listings/listings.html',
		      controller: 'AdminController'
		    }).
		    otherwise({
		      redirectTo: '/dashboard'
		    });
	}]);

app.factory('Listings', ['$resource', function ($resource) {
	return $resource('/listings.json', {}, {
	  query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
	  create: { method: 'POST' }
	});
}]);

app.controller('AdminController', ['$scope', '$resource', 'Listings',
	function ($scope, $resource, Listings) {

		$scope.listings = Listings.query();
	}
]);