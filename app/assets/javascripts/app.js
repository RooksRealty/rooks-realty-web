  var app = angular.module('rooksRealty',['ngResource', 'ngRoute']);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'views/listings/listings.html',
          controller: 'HomeController'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);

	app.config(["$httpProvider", function (provider) {
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
  }]);

  app.factory('Listings', ['$resource', function ($resource) {
    return $resource('/listings.json', {}, {
      query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
      create: { method: 'POST' }
    });
	}]);

	app.controller('HomeController', ['$scope', '$resource', 'Listings',
		function ($scope, $resource, Listings) {

			$scope.listings = Listings.query();

      $scope.showListing = function () {
        // var modalInstance = $modal.open({
        //   templateUrl: 'views/listings/listing-detail.html',
        //   controller: 'ListingController',
        //   size: 'lg',
        //   backdrop: 'static',
        //   resolve: {
        //     listing: function () {
        //       return {};
        //     }
        //   }
        // });

        // modalInstance.result.then(function (data) {
        //   console.log(data);
        //   $location.url('/');
        // }, function () {

        // });
      };

		}
	]);
