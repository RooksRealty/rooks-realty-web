  var app = angular.module('rooksRealty',['ngResource']);

	app.config(["$httpProvider", function (provider) {
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')

  }]);

  app.factory('Listings', ['$resource', function ($resource) {
    return $resource('/listings.json', {}, {
      query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="9f2b792de70c66745b4f0f4239f433d6"' } },
      create: { method: 'POST' }
    });
	}]);

	app.controller('HomeController', ['$scope', '$resource', 'Listings', 
		function ($scope, $resource, Listings) {

			$scope.listings = Listings.query();

		}
	]);
