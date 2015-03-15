var app = angular.module('directives', []);

app.directive('propertyTypes', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/company/shared/propertyTypes.html'
    };
});

app.directive('maxPrice', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'views/company/shared/maxPrice.html'
    };
});

app.directive('minPrice', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/company/shared/minPrice.html'
    };
});