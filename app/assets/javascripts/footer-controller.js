var app = angular.module('footer', ['services']);

app.controller('FooterController', ['$scope', 'InfoService', function ($scope, InfoService) {
    $scope.helpers = Utilities.helpers;

    $scope.info = InfoService.getWebsiteInfo(function () {
        $scope.info.fax = $scope.helpers.formatPhoneNumber($scope.info.fax);
        $scope.info.phone_number = $scope.helpers.formatPhoneNumber($scope.info.phone_number);
    });
}]);