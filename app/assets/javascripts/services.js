// (function () {
	var app = angular.module('adminServices', ['ngResource', 'ngRoute']);

	app.config(["$httpProvider", function (provider) {
	    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
	}]);

	app.factory('Listings', ['$resource', function ($resource) {
		return $resource('/listings.json', {}, {
		  query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
		  create: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
		});
	}]);

	app.factory('ListingService', ['$resource', function ($resource) {
	    return $resource('/listings/:id.json', {}, {
	      show: { method: 'GET' },
	      update: { method: 'PUT', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
	      delete: { method: 'DELETE', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
	    });
	}]);

	app.factory('RealtorService', ['$resource', function ($resource) {
	    return $resource('/realtors/:id.json', {}, {
	      show: { method: 'GET' },
	      update: { method: 'PUT', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
	      delete: { method: 'DELETE', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
	    });
	}]);

	app.factory('Realtors', ['$resource', function ($resource) {
		return $resource('/realtors.json', {}, {
		  query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
		  create: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
		});
	}]);
// });