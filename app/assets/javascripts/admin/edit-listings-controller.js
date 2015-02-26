var app = angular.module('editListing',['ui.bootstrap', 'angularFileUpload', 'services']);

app.controller('EditListingController', ['$scope', '$modalInstance', 'Realtors', 'Listings', 'ListingService', 'listing', '$upload',
	function ($scope, $modalInstance, Realtors, Listings, ListingService, listing, $upload) {
		$scope.realtors = Realtors.query();
		$scope.listing = listing;
		window.scope = $scope;

		$scope.create = function () {
			if($scope.listingForm.$valid) {
				Listings.create({listing: $scope.listing}, function () {
	              $modalInstance.close();
	            }, function (error) {
	              console.log(error);
	            });
			}
		};

		$scope.update = function () {
			if($scope.listingForm.$valid) {
				ListingService.update($scope.listing, function() {
					if($scope.temp_file) {
						$scope.upload($scope.temp_file, $scope.listing.id);
					}
		            $modalInstance.close();
		          }, function (error) {
		            console.log(error);
		          });
			}
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