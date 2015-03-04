var app = angular.module('listing-detail', ['services', 'ngRoute', 'ui.bootstrap', 'schedule-showing']);

app.controller('ListingDetailController', ['$scope', '$modal', '$routeParams', 'ListingService',
    function ($scope, $modal, $routeParams, ListingService) {
      var map;

      window.scrollTo(0, 0);
      
      $scope.listing = ListingService.show({id: $routeParams.id}, function () {
        
        var mapOptions = {
          zoom: 17
        };

        $scope.searchAddress = $scope.listing.address + "," + $scope.listing.city + "," + $scope.listing.zip_code;

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': $scope.searchAddress}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      });

      $scope.scheduleShowing = function () {
      	var modalInstance = $modal.open({
		      templateUrl: 'views/company/schedule-showing.html',
		      controller: 'ScheduleShowingController',
		      size: 'md',
		      resolve: {
		        listing: function () {
		          return $scope.listing;
		        }
		      }
		    });

		    modalInstance.result.then(function () {
		      
		    }, function () {
			  
		    });
      };

    }

  ]);
