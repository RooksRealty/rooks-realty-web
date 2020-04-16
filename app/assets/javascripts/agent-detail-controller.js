var app = angular.module('agent-detail', ['ngResource', 'ngRoute', 'services', 'ui.bootstrap']);

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
