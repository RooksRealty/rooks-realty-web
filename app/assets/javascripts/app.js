  var app = angular.module('rooksRealty',['ngResource', 'ngRoute', 'services', 'admin']);

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

      $scope.isAdminPortal = function () {
        return $location.url().indexOf('admin') >= 0;
      };

      window.scrollTo(0, 0);
			$scope.listings = Listings.query();

      $scope.recent = function (listing) {
        var created_at = new Date(listing.created_at);
        var ONE_WEEK = 60*60*24*7*1000;
        return ((new Date) - created_at) < ONE_WEEK;
      }

      $scope.showListing = function (listingId) {
        $location.url('/listings/' + listingId)
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

  app.controller('ListingDetailController', ['$scope', 'listingId', 'ListingsService',
    function ($scope, listingId, ListingsService) {
      $scope.listing = ListingsService.show(listingId);
    }

  ]);
