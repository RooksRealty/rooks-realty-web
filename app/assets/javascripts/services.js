var app = angular.module('services', ['ngResource', 'ngRoute']);

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
      show: { method: 'GET', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
      update: { method: 'PUT', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
      delete: { method: 'DELETE', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
    });
}]);

app.factory('RealtorService', ['$resource', function ($resource) {
    return $resource('/realtors/:id.json', {}, {
      show: { method: 'GET', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
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

app.factory('Users', ['$resource', function ($resource) {
  return $resource('/users.json', {}, {
    query: { method: 'GET', isArray: true, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
    create: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
  });
}]);

app.factory('UserService', ['$resource', function ($resource) {
    return $resource('/users/:id.json', {}, {
      show: { method: 'GET', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
      update: { method: 'PUT', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
      delete: { method: 'DELETE', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
    });
}]);

app.factory('EmailService', ['$resource', function ($resource) {
  return $resource('/contact', {}, {
    sendEmail: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
  });
}]);

app.factory('InfoService', ['$resource', function ($resource) {
  return $resource('/info.json', {}, {
    getWebsiteInfo: { method: 'GET', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } },
    update: { method: 'PUT', params: {id: '@id'}, headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
  });
}]);


app.factory('ShowingService', ['$resource', function ($resource) {
  return $resource('/schedule_showing', {}, {
    scheduleShowing: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
  });
}]);

app.factory('QuestionService', ['$resource', function ($resource) {
  return $resource('/property_question', {}, {
    askQuestion: { method: 'POST', headers: { 'Authorization' : 'Token token="b9dee854a6f62cd3589c0c76569d2883"' } }
  });
}]);