var app = angular.module('rooksRealtyAdmin',['ngResource', 'ngRoute', 'ui.bootstrap']);

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
	  create: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
	});
}]);

app.factory('ListingService', ['$resource', function ($resource) {
    return $resource('/listings/:id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
      delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);

app.factory('Realtors', ['$resource', function ($resource) {
	return $resource('/realtors.json', {}, {
	  query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
	  create: { method: 'POST' }
	});
}]);

app.controller('AdminController', ['$scope', '$resource', 'Listings', '$modal',
	function ($scope, $resource, Listings, $modal) {

		$scope.orderByField = 'mls';
      	$scope.reverseSort = false;
		$scope.loading = true;

		$scope.listings = Listings.query(function () {
			$scope.loading = false;
		});

		$scope.columnFilter = function (name) {
			$scope.orderByField = name; 
			$scope.reverseSort = !$scope.reverseSort;
		}

		$scope.updateSortArrow = function (column) {
			return {
				'fa fa-sort':$scope.orderByField != column,
				'fa fa-sort-up':!$scope.reverseSort && $scope.orderByField == column, 
				'fa fa-sort-down':$scope.reverseSort && $scope.orderByField == column
			};
		}

      	$scope.openModal = function (currentListing) {
      		var modalInstance = $modal.open({
		      templateUrl: 'edit-listing.html',
		      controller: 'EditListingController',
		      size: 'lg',
		      resolve: {
		        listing: function () {
		          return currentListing;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
			  $scope.loading = true;
			  $scope.listings = Listings.query(function () {
				$scope.loading = false;
			  });
		    }, function () {
		     	console.log('Modal dismissed at: ' + new Date());
		    });
      	}
	}
]);

app.controller('EditListingController', ['$scope', '$modalInstance', 'Realtors', 'Listings', 'ListingService', 'listing', 
	function ($scope, $modalInstance, Realtors, Listings, ListingService, listing) {
		$scope.realtors = Realtors.query();
		$scope.listing = listing;

		$scope.create = function () {
			//TODO check if form is valid
			Listings.create({listing: $scope.listing}, function () {
              $modalInstance.close();
            }, function (error) {
              console.log(error);
            });
		};

		$scope.update = function () {
			//TODO check if form is valid
			ListingService.update($scope.listing, function() {
	            $modalInstance.close();
	          }, function (error) {
	            console.log(error);
	          });
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

}]);