  var app = angular.module('rooksRealty',['ngResource', 'ngRoute']);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'views/listings/listings.html',
          controller: 'HomeController'
        }).
        when('/agents', {
          templateUrl: 'views/company/agents.html',
          controller: 'AgentController'
        }).
        when('/about', {
          templateUrl: 'views/company/about.html',
          controller: 'AboutController'
        }).
        when('/contact', {
          templateUrl: 'views/company/contact.html',
          controller: 'ContactController'
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


  app.factory('Realtors', ['$resource', function ($resource) {
    return $resource('/realtors.json', {}, {
      query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
      create: { method: 'POST' }
    });
  }]);

  app.factory('EmailService', ['$resource', function ($resource) {
    return $resource('/contact', {}, {
      sendEmail: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
    });
  }]);

  app.controller('NavController', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (path) {
      return path === $location.path();
    };
  }]);

	app.controller('HomeController', ['$scope', '$resource', 'Listings',
		function ($scope, $resource, Listings) {

      window.scrollTo(0, 0);
			$scope.listings = Listings.query();

      $scope.recent = function (listing) {
        var created_at = new Date(listing.created_at);
        var ONE_WEEK = 60*60*24*7*1000;
        return ((new Date) - created_at) < ONE_WEEK;
      }

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

  app.controller('AgentController', ['$scope', 'Realtors', 
    function ($scope, Realtors) {
      window.scrollTo(0, 0);
      $scope.agents = Realtors.query();
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
