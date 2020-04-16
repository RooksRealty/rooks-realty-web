var app = angular.module('rooksRealty', ['ngResource', 'ngRoute',
    'admin', 'about', 'agent', 'agent-detail', 'contact', 'directives', 'footer', 'helpers', 'home',
    'listing-detail', 'navigation', 'schedule-showing', 'search', 'services']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/listings/listings.html',
                controller: 'HomeController'
            }).
            when('/agents', {
                templateUrl: 'views/company/agents.html',
                controller: 'AgentsController'
            }).
            when('/agents/:id', {
                templateUrl: 'views/company/agent-detail.html',
                controller: 'AgentDetailController'
            }).
            when('/about', {
                templateUrl: 'views/company/about.html',
                controller: 'AboutController'
            }).
            when('/contact', {
                templateUrl: 'views/company/contact.html',
                controller: 'ContactController'
            }).
            when('/listings/:id', {
                templateUrl: 'views/listings/listing-detail.html',
                controller: 'ListingDetailController'
            }).
            when('/search', {
                templateUrl: 'views/company/search.html',
                controller: 'SearchController'
            }).
            when('/showing', {
                templateUrl: 'views/company/schedule-showing.html',
                controller: 'ScheduleShowingController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);