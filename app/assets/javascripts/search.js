var app = angular.module('search', ['services', 'ngAutocomplete']);

app.controller('SearchController', ['$scope', '$timeout', 'Listings',
    function ($scope, $timeout, Listings) {
        $scope.loading = true;
        $scope.prices = 40;
        $scope.rooms = 4;
        $scope.sqft = 20;
        $scope.acres = 30;
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.displayAs = 'list';

        var defaultBounds = new google.maps.LatLngBounds(
            // North Alabama
            new google.maps.LatLng(35.125974, -85.328344), 
            new google.maps.LatLng(33.817263, -88.297399));

        $scope.locationOptions = {
            bounds: defaultBounds,
            types: '(regions)',
            country: 'us'
        };

        $scope.query = {
            min_price: 'Any',
            max_price: 'Any',
            beds: 'Any',
            baths: 'Any',
            sqft: 'Any',
            acres: 'Any'
        };

        $scope.sortTypes = [
            { label: 'MLS', value: 'mls' },
            { label: 'Price (low-high)', value: 'price' },
            { label: 'Price (high-low)', value: 'price' },
            { label: 'Acres', value: 'acres' },
            { label: 'Baths', value: 'bathrooms' },
            { label: 'Beds', value: 'bedrooms' }
        ];
        $scope.sortBy = $scope.sortTypes[0];

        $scope.init = function () {
            $scope.listings = Listings.query(function () {
                $scope.loading = false;
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = begin + $scope.numPerPage;

                $scope.filteredListings = $scope.listings.slice(begin, end);
            });

            // $('.search-panel').affix({ offset: { top: 0 } });
        };
        

        $scope.getNumber = function (num) {
            return new Array(num);
        };

        $scope.numPages = function () {
            return Math.ceil($scope.listings.length / $scope.numPerPage);
        };

        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage);
            var end = begin + $scope.numPerPage;

            if ($scope.listings.length > 0) {
                $("html, body").animate({ scrollTop: "0px" }, 500);
                $scope.filteredListings = $scope.listings.slice(begin, end);
            }
        });

        $scope.init();
    }
]);

app.filter('searchFilter', function () {
    return function (input, query) {
        input = input || '';

        var min_price = filterByCriteria(query.min_price, input, 'price', true);
        var max_price = filterByCriteria(query.max_price, input, 'price', false);
        var beds = filterByCriteria(query.beds, input, 'bedrooms', true);
        var baths = filterByCriteria(query.baths, input, 'bathrooms', true);
        var sqft = filterByCriteria(query.sqft, input, 'sqft', true);
        var acres = filterByCriteria(query.acres, input, 'acres', true);

        var location = [];
        if(query.locationDetails && query.location) {
            if(_.contains(query.locationDetails.types, 'postal_code')) {
                var postal_code = query.locationDetails.address_components[0].long_name;
                location = filterLocation(postal_code, input, 'zipcode');
            } else {
                var city = query.locationDetails.address_components[0].long_name;
                location = filterLocation(city, input, 'city');
            }

        } else {
            location = input;
        }

        return _.intersection(min_price, max_price, beds, baths, sqft, acres, location);
    }
});

var filterByCriteria = function (criteria, input, field, min) {
    var output = [];
    if (criteria !== 'Any') {
        for (var idx in input) {
            if (min) {
                output.push(getMin(criteria, input[idx], field));
            } else {
                output.push(getMax(criteria, input[idx], field));
            }
        }
    } else {
        output = input;
    }

    return output;
};

var filterLocation = function (criteria, input, field) {
    var output = [];
    for(var idx in input) {
        if(criteria === input[idx][field]) {
            output.push(input[idx]);
        }
    }

    return output;
}

var getMin = function (criteria, input, field) {
    if (criteria <= input[field]) {
        return input;
    }

    return null;
};

var getMax = function (criteria, input, field) {
    if (criteria >= input[field]) {
        return input;
    }

    return null;
};
