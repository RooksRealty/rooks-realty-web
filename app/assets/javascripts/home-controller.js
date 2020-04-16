var app = angular.module('home', ['ngResource', 'ngRoute', 'services']);

app.controller('HomeController', ['$scope', '$resource', '$location', 'Listings', 'InfoService',
    function ($scope, $resource, $location, Listings, InfoService) {

        window.scrollTo(0, 0);
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

        $scope.listings = Listings.query(function () {
            $scope.loading = false;
        });

        $scope.getNumber = function (num) {
            return new Array(num);
        };

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