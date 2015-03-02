  var app = angular.module('rooksRealty',['ngResource', 'ngRoute', 'services', 'admin', 'helpers']);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'views/listings/listings.html',
          controller: 'HomeController'
        }).
        when('/agents', {
          templateUrl: 'views/company/agents.html',
          controller: 'AgentsController'
        }).
        when('/agents/:id', {
          templateUrl: 'views/company/agent-detail.html',
          controller: 'AgentDetailController'
        }).
        when('/about', {
          templateUrl: 'views/company/about.html',
          controller: 'AboutController'
        }).
        when('/contact', {
          templateUrl: 'views/company/contact.html',
          controller: 'ContactController'
        }).
        when('/listings/:id', {
          templateUrl: 'views/listings/listing-detail.html',
          controller: 'ListingDetailController'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);


  app.controller('NavController', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (path) {
      return path === $location.path();
    };
  }]);

	app.controller('HomeController', ['$scope', '$resource', 'Listings', '$location',
		function ($scope, $resource, Listings, $location) {

      window.scrollTo(0, 0);
      $scope.loading = true;
			$scope.listings = Listings.query(function () {
        $scope.loading = false;
      });

      $scope.isAdminPortal = function () {
        return $location.url().indexOf('admin') >= 0;
      };

      $scope.recent = function (listing) {
        var created_at = new Date(listing.created_at);
        var ONE_WEEK = 60*60*24*7*1000;
        return ((new Date) - created_at) < ONE_WEEK;
      };

		}
	]);

  app.controller('AgentsController', ['$scope', 'Realtors', 
    function ($scope, Realtors) {
      window.scrollTo(0, 0);
      $scope.agents = Realtors.query();
    }
  ]);

  app.controller('AgentDetailController', ['$scope', '$routeParams', 'RealtorService',
    function ($scope, $routeParams, RealtorService) {
      window.scrollTo(0, 0);
      $scope.agent = RealtorService.show({id: $routeParams.id});
    }
  ]);

  app.controller('AboutController', ['$scope', 
    function ($scope, Realtors) {
      window.scrollTo(0, 0);
    }
  ]);

  app.controller('ContactController', ['$scope', '$location', 'EmailService',
    function ($scope, $location, EmailService) {
      window.scrollTo(0, 0);

      $scope.alerts = [
        { type: 'danger', msg: 'Something went wrong. Please try to submit again.' },
        { type: 'success', msg: 'Your message has been submitted. You should hear from us soon.' }
      ];

      $scope.submit = function (contact) {
        if ($scope.contactForm.$valid) {
          $scope.sending = true;
    
          EmailService.sendEmail(contact, function () {
            $scope.alert = $scope.alerts[1];
            $scope.contact = {};
            $scope.contactForm.$setPristine();
            $scope.contactForm.$setUntouched();
            $scope.showAlert = true;
            $scope.sending = false;
          }, function (error) {
            console.log(error);
            $scope.alert = $scope.alerts[0];
            $scope.showAlert = true;
            $scope.sending = false;
          });
        }
      };

      $scope.isDisabled = function (contactForm) {
        return contactForm.email.$touched && contactForm.email.$invalid || 
              contactForm.message.$touched && contactForm.message.$invalid ||
              contactForm.email.$untouched || contactForm.message.$untouched;
      };
    }
  ]);

  app.controller('ListingDetailController', ['$scope', '$routeParams', 'ListingService',
    function ($scope, $routeParams, ListingService) {
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
    }

  ]);
