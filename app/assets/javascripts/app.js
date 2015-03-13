var app = angular.module('rooksRealty', ['ngResource', 'ngRoute', 'services', 'ui.bootstrap',
    'admin', 'helpers', 'contact', 'listing-detail', 'search', 'directives']);

app.config(['$routeProvider',
    function ($routeProvider) {
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
            when('/search', {
                templateUrl: 'views/company/search.html',
                controller: 'SearchController'
            }).
            when('/showing', {
                templateUrl: 'views/company/schedule-showing.html',
                controller: 'ScheduleShowingController'
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
        $('.selectpicker').selectpicker();
        $scope.loading = true;

        $scope.prices = 40;
        $scope.rooms = 4;
        $scope.query = {
            min_price: 'Any',
            max_price: 'Any',
            beds: 'Any',
            baths: 'Any',
            types: "['Single Family']"
        };

        $scope.getNumber = function (num) {
            return new Array(num);
        };

        $scope.listings = Listings.query(function () {
            $scope.loading = false;
        });

        $scope.isAdminPortal = function () {
            return $location.url().indexOf('admin') >= 0;
        };

        $scope.recent = function (listing) {
            var created_at = new Date(listing.created_at);
            var ONE_WEEK = 60 * 60 * 24 * 7 * 1000;
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

app.controller('AgentDetailController', ['$scope', '$modal', '$routeParams', 'RealtorService',
    function ($scope, $modal, $routeParams, RealtorService) {
        window.scrollTo(0, 0);
        $scope.agent = RealtorService.show({id: $routeParams.id});

        $scope.scheduleShowing = function (listing) {
            var modalInstance = $modal.open({
                templateUrl: 'views/company/schedule-showing.html',
                controller: 'ScheduleShowingController',
                size: 'md',
                resolve: {
                    listing: function () {
                        return listing;
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {

            });
        };
    }
]);

app.controller('AboutController', ['$scope',
    function ($scope, Realtors) {
        window.scrollTo(0, 0);
    }
]);