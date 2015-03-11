var app = angular.module('search', ['services']);

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

    	$scope.listings = Listings.query(function () {
    		$scope.loading = false;
    		var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		    var end = begin + $scope.numPerPage;
		    
		    $scope.filteredListings = $scope.listings.slice(begin, end);
    	});

    	$scope.getNumber = function (num) {
    		return new Array(num);
    	};

    	$scope.numPages = $timeout(function () {
        return Math.ceil($scope.filtered.length / $scope.numPerPage);
      }, 10);
		  
  		$scope.$watch('currentPage + numPerPage', function() {
  		    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
  		    var end = begin + $scope.numPerPage;
  		    
  		    if($scope.listings) {
  			    $scope.filteredListings = $scope.listings.slice(begin, end);
  			  }
  		});
  }
]);

app.filter('searchFilter', function() {
  return function(input, query) {
    input = input || '';

    var min_price = filterByCriteria(query.min_price, input, 'price', true);
    var max_price = filterByCriteria(query.max_price, input, 'price', false);
    var beds = filterByCriteria(query.beds, input, 'bedrooms', true);
    var baths = filterByCriteria(query.baths, input, 'bathrooms', true);
    var sqft = filterByCriteria(query.sqft, input, 'sqft', true);
    var acres = filterByCriteria(query.acres, input, 'acres', true);

    return _.intersection(min_price, max_price, beds, baths, sqft, acres);;
  }
});

var filterByCriteria = function (criteria, input, field, min) {
  var output = [];
  if(criteria !== 'Any') {
    for(var idx in input) {
      if(min) {
        output.push(getMin(criteria, input[idx], field));
      } else {
        output.push(getMax(criteria, input[idx], field));
      }
    }
  } else {
    output = input;
  }

  return output;
}

var getMin = function (criteria, input, field) {
  if(criteria <= input[field]) {
    return input;
  }

  return null;
};

var getMax = function (criteria, input, field) {
  if(criteria >= input[field]) {
    return input;
  }

  return null;
};
