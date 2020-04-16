var app = angular.module('agent', ['services']);

app.controller('AgentsController', ['$scope', 'Realtors',
    function ($scope, Realtors) {
        window.scrollTo(0, 0);
        $scope.agents = Realtors.query();
    }
]);