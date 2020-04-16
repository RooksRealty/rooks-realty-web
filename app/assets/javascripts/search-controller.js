var app = angular.module('search', ['services', 'ngAutocomplete', 'angular-bootstrap-select']);

app.controller('SearchController', ['$scope', '$timeout', '$location', '$anchorScroll', 'Listings',
    function ($scope, $timeout, $location, $anchorScroll, Listings) {
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
        $scope.orderBy = 'mls';
        $scope.markers = [];

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
            { label: 'Price (high-low)', value: '!price' },
            { label: 'Acres', value: 'acres' },
            { label: 'Baths', value: 'bathrooms' },
            { label: 'Beds', value: 'bedrooms' }
        ];
        $scope.sortBy = $scope.sortTypes[0];

        $scope.$watch('orderBy', function () {
            if($scope.orderBy === '!price') {
                $scope.orderByField = 'price';
                $scope.reverseSort = true;
            } else {
                $scope.orderByField = $scope.orderBy;
                $scope.reverseSort = false;
            }
        });

        $scope.init = function () {
            $scope.listings = Listings.query(function () {
                $scope.loading = false;
                var begin = (($scope.currentPage - 1) * $scope.numPerPage);
                var end = begin + $scope.numPerPage;

                $scope.filteredListings = $scope.listings.slice(begin, end);

                for(var idx in $scope.listings) {
                  $scope.createMarker($scope.listings[idx]);
                }

                console.log($scope.markers);
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

            // $('.search-panel').affix({ offset: { top: 0 } });
        };

       $scope.showMap = function () {
           $scope.displayAs = 'map';
           $scope.initializeMap();
       };

       $scope.hideMap = function () {
            console.log('hiding map!');
            $('#search-map').empty();
       };

       $scope.initializeMap = function() {
         var mapOptions = {
           zoom: 10,
           center: new google.maps.LatLng(34.738114, -86.593832)
         };
         map = new google.maps.Map(document.getElementById('search-map'), mapOptions);

         for(var idx in $scope.filtered) {
             $scope.createMarker(map, $scope.listings[idx]);
         }

       };

        $scope.createMarker = function (map, listing) {
            var marker;
            var geocoder = new google.maps.Geocoder();
            var fullAddress = listing.address + ", " + listing.city + ", " + listing.state + " " + listing.zipcode;

            geocoder.geocode( { 'address': fullAddress}, _.bind(function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    var marker = new google.maps.Marker({
                        id: listing.id, 
                        position: results[0].geometry.location,
                        title: "MLS # " + listing.mls,
                        map: map
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: "<div class='text-center'>" +
                            "<a href='../#/listings/" + listing.id + "'><img class='thumb' src='" + listing.avatar + "'/></a><br>" +
                            "<span>" + listing.address + "</span><br>" +
                            "<p><span>" + listing.bedrooms + " <i class='fa fa-bed'></i> | </span>" +
                            "<span>" + listing.bathrooms + " <img src='assets/shower.png'/></span></p></div>"
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    $scope.markers.push(marker);
                }
            }, listing));
        };

       $scope.updateMap = function() {
           if($scope.displayAs === 'map') {
               map = null;
               $scope.initializeMap();
           }
       };

        $scope.gotoResults = function() {
          $location.hash('results');
          $anchorScroll();
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
