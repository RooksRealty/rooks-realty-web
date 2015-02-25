var app = angular.module('rooksRealtyAdmin',['ngResource', 'ngRoute', 'ui.bootstrap', 'angularFileUpload']);

app.config(["$httpProvider", function (provider) {
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
}]);

app.config(['$routeProvider',
	function($routeProvider) {
  		$routeProvider.
		    when('/dashboard/listings', {
		      templateUrl: 'views/admin/listings/listings.html',
		      controller: 'AdminController'
		    }).
		    when('/dashboard/agents', {
		      templateUrl: 'views/admin/agents/agents.html',
		      controller: 'AdminAgentController'
		    }).
		    otherwise({
		      redirectTo: '/dashboard/listings'
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
      delete: { method: 'DELETE', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
    });
}]);

app.factory('RealtorService', ['$resource', function ($resource) {
    return $resource('/realtors/:id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
      delete: { method: 'DELETE', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
    });
}]);

app.factory('Realtors', ['$resource', function ($resource) {
	return $resource('/realtors.json', {}, {
	  query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
	  create: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
	});
}]);

app.controller('AdminController', ['$scope', '$resource', 'Listings', 'ListingService', '$modal',
	function ($scope, $resource, Listings, ListingService, $modal) {

		$scope.orderByField = 'mls';
      	$scope.reverseSort = false;
		$scope.loading = true;
		$scope.currentPage = 1;
  		$scope.numPerPage = 10;
  		$scope.maxSize = 5;

  		$scope.init = function () {
			$scope.listings = Listings.query(function () {
				$scope.loading = false;
				var begin = (($scope.currentPage - 1) * $scope.numPerPage);
			    var end = begin + $scope.numPerPage;
			    
			    $scope.filteredListings = $scope.listings.slice(begin, end);
			});
		}

		$scope.numPages = function () {
		    return Math.ceil($scope.listings.length / $scope.numPerPage);
		};
		  
		$scope.$watch('currentPage + numPerPage', function() {
		    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		    var end = begin + $scope.numPerPage;
		    
		    if($scope.listings) {
			    $scope.filteredListings = $scope.listings.slice(begin, end);
			}
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

		$scope.removeListing = function (listingId) {
			var response = confirm("Are you sure you want to remove this listing?");
			if (response == true) {
			    ListingService.delete({ id: listingId }, function () {
		        	$scope.init();
		        });
			}
		};

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
		    }, function () {
			  $scope.init();
		    });
      	};

  		$scope.init();
	}
]);

app.controller('EditListingController', ['$scope', '$modalInstance', 'Realtors', 'Listings', 'ListingService', 'listing', '$upload',
	function ($scope, $modalInstance, Realtors, Listings, ListingService, listing, $upload) {
		$scope.realtors = Realtors.query();
		$scope.listing = listing;
		window.scope = $scope;

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
				$scope.upload($scope.temp_file, $scope.listing.id);
	            $modalInstance.close();
	          }, function (error) {
	            console.log(error);
	          });
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.removeListing = function (listingId) {
			var response = confirm("Are you sure you want to remove this listing?");
			if (response == true) {
			    ListingService.delete({ id: listingId }, function () {
		        	$modalInstance.dismiss();
		        });
			}
		};

		$scope.setFile = function (files) {
			$scope.temp_file = files[0];
		};

		$scope.upload = function(file, id) {
		  // for (var i = 0; i < $files.length; i++) {
		      // var file = $files[i];
		      $scope.upload = $upload.upload({
		          url: 'admin/listing/image/upload/' + id + '.json', 
		          file: file
		      }).progress(function(evt) {
		         console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
		      }).success(function(data, status, headers, config) {
		         console.log(data);
		      });
		   // }
		};

}]);

app.controller('NavController', ['$scope', '$location', function ($scope, $location) {
	$scope.isActive = function (path) {
	  return path === $location.path();
	};
}]);

app.controller('AdminAgentController', ['$scope', '$modal', 'Realtors', 'RealtorService',
	function ($scope, $modal, Realtors, RealtorService) {
		$scope.orderByField = 'name';
      	$scope.reverseSort = false;
		$scope.loading = true;
		$scope.currentPage = 1;
  		$scope.numPerPage = 10;
  		$scope.maxSize = 5;

  		$scope.init = function () {
			$scope.agents = Realtors.query(function () {
				$scope.loading = false;

				var begin = (($scope.currentPage - 1) * $scope.numPerPage);
			    var end = begin + $scope.numPerPage;
			    
			    $scope.filteredAgents = $scope.agents.slice(begin, end);
			});
		};

		$scope.numPages = function () {
		    return Math.ceil($scope.agents.length / $scope.numPerPage);
		};
		  
		$scope.$watch('currentPage + numPerPage', function() {
		    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		    var end = begin + $scope.numPerPage;
		    
		    if($scope.agents) {
			    $scope.filteredAgents = $scope.agents.slice(begin, end);
			}
		});

		$scope.columnFilter = function (name) {
			$scope.orderByField = name; 
			$scope.reverseSort = !$scope.reverseSort;
		};

		$scope.updateSortArrow = function (column) {
			return {
				'fa fa-sort':$scope.orderByField != column,
				'fa fa-sort-up':!$scope.reverseSort && $scope.orderByField == column, 
				'fa fa-sort-down':$scope.reverseSort && $scope.orderByField == column
			};
		};

		$scope.removeAgent = function (realtorId) {
			var response = confirm("Are you sure you want to remove this agent?");
			if (response == true) {
			    RealtorService.delete({ id: realtorId }, function () {
		        	$scope.init();
		        });
			}
		};

		$scope.openAgentModal = function (currentAgent) {
      		var modalInstance = $modal.open({
		      templateUrl: 'edit-agent.html',
		      controller: 'EditAgentController',
		      size: 'lg',
		      resolve: {
		        agent: function () {
		          return currentAgent;
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

      	$scope.init();
	}
]);

app.controller('EditAgentController', ['$scope', '$modalInstance', '$upload', 'agent', 'RealtorService', 'Realtors',
	function ($scope, $modalInstance, $upload, agent, RealtorService, Realtors) {
		$scope.realtor = agent;

		$scope.update = function () {
			if($scope.agentForm.$valid) {
				RealtorService.update($scope.realtor, function() {
					$scope.upload($scope.temp_file, $scope.realtor.id);
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
