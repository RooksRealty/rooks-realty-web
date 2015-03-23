var app = angular.module('listing-detail', ['services', 'ngRoute', 'ui.bootstrap', 'schedule-showing']);

app.controller('ListingDetailController', ['$scope', '$modal', '$routeParams', 'ListingService', 'QuestionService',
    function ($scope, $modal, $routeParams, ListingService, QuestionService) {
      var map;

      window.scrollTo(0, 0);
      $scope.alert = { msg: '' };
      $scope.showAlert = false;
      $scope.helpers = Utilities.helpers;
      
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

        $scope.question = { 
          question: "I have a question about MLS# " + $scope.listing.mls + " at " + $scope.listing.address + ":",
          mls: $scope.listing.mls
        };
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

      $scope.askPropertyQuestion = function () {
        if($scope.questionForm.$valid && $scope.isQuestionFormValid()) {
          QuestionService.askQuestion({question: $scope.question}, function () {
                  $scope.alert.msg = 'Your question has been sent! An agent will get back to you shortly.';
                  $scope.alert.type = 'success';
                  $scope.showAlert = true;
                }, function (error) {
                  $scope.alert.msg = 'Something went wrong. Try submiting again.';
                  $scope.alert.type = 'danger';
                  $scope.showAlert = true;
                  console.log(error);
                });
        } else {
          $scope.alert.msg = '';

          if(!$scope.question.email && !$scope.question.phone_number) {
            $scope.alert.msg += 'Please enter either an email or phone number.';
          }

          if($scope.question.question == "I have a question about MLS# " + $scope.listing.mls + " at " + $scope.listing.address + ":") {
            $scope.alert.msg += ' Please add your question.';  
          }
          
          $scope.alert.type = 'danger';
          $scope.showAlert = true;
        }
      };

      $scope.isQuestionFormValid = function () {
        return $scope.question.question != "I have a question about MLS# " + $scope.listing.mls + " at " + $scope.listing.address + ":" &&
          ($scope.question.email || $scope.question.phone_number);

      };

      $scope.format = function () {
        $scope.question.phone_number = $scope.helpers.formatPhoneNumber($scope.question.phone_number);
      };

    }

  ]);
