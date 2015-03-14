var app = angular.module('search', ['services', 'ngAutocomplete']);

app.controller('SearchController', ['$scope', '$timeout', 'Listings',
    function ($scope, $timeout, Listings) {
        window.scrollTo(0, 0);

        $scope.loading = true;
        $scope.prices = 40;
        $scope.rooms = 4;
        $scope.sqft = 20;
        $scope.acres = 30;
        $scope.year = 12;
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.displayAs = 'list';
        $scope.orderByField = 'mls';

        $scope.query = {
            min_price: 'Any',
            max_price: 'Any',
            beds: 'Any',
            baths: 'Any',
            sqft: 'Any',
            acres: 'Any',
            types: '',
            year: 'Any'
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

            if(window.google) {
                var defaultBounds = new google.maps.LatLngBounds(
                    // North Alabama
                    new google.maps.LatLng(35.125974, -85.328344),
                    new google.maps.LatLng(33.817263, -88.297399));

                $scope.locationOptions = {
                    bounds: defaultBounds,
                    types: '(regions)',
                    country: 'us'
                };
            } else {
                $('#location').addClass('hidden');
                $('label[for="location"]').addClass('hidden');
            }

            $('.selectpicker').selectpicker();
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

        $('.selectpicker').selectpicker();
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
        var year = filterByCriteria(query.year, input, 'year_built', true);

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

        var type = [];
        if(query.types && query.types.length > 0) {
            for(var idx in input) {
                if(_.contains(query.types, input[idx].build_type)) {
                    type.push(input[idx]);
                }
            }
        } else {
            type = input;
        }

        return _.intersection(min_price, max_price, beds, baths, sqft, acres, location, year, type);
    }
});

var filterByCriteria = function (criteria, input, field, min) {
    var output = [];
    if (criteria !== 'Any') {
        output = _.filter(input, _.bind(function(listing) {
            if (min) {
                return getMin(criteria, listing, field);
            } else {
                return getMax(criteria, listing, field);
            }
        }), criteria);
    } else {
        output = input;
    }

    return output;
};

var filterLocation = function (criteria, input, field) {
    var output = [];
    output = _.filter(input, _.bind(function(listing) {
        if(criteria === listing[field]) {
            return listing;
        }
    }), criteria);

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
