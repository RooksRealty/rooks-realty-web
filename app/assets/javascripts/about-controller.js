var app = angular.module('about', ['services']);

app.controller('AboutController', ['$scope', '$sce', 'InfoService',
    function ($scope, $sce, InfoService) {
        window.scrollTo(0, 0);

        $scope.info = InfoService.getWebsiteInfo(function () {
            $scope.info.about_us = $sce.trustAsHtml($scope.info.about_us);
        });
    }
]);