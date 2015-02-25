var app = angular.module('adminListings', ['ui.bootstrap', 'angularFileUpload', 'adminServices']);

app.controller('AdminListingsController', ['$scope', '$resource', 'Listings', 'ListingService', '$modal',
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