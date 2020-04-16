var app = angular.module('services', ['ngResource', 'ngRoute']);

app.config(["$httpProvider", function (provider) {
    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    provider.defaults.headers.common['Authorization'] = 'Token token="cfca22c9c49ee46482e37d636659175a"';
}]);

app.factory('Listings', ['$resource', function ($resource) {
	return $resource('/listings.json', {}, {
	  query: { method: 'GET', isArray: true },
	  create: { method: 'POST' }
	});
}]);

app.factory('ListingService', ['$resource', function ($resource) {
    return $resource('/listings/:id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT', params: {id: '@id'} },
      delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);

app.factory('RealtorService', ['$resource', function ($resource) {
    return $resource('/realtors/:id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT', params: {id: '@id'} },
      delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);

app.factory('Realtors', ['$resource', function ($resource) {
	return $resource('/realtors.json', {}, {
	  query: { method: 'GET', isArray: true },
	  create: { method: 'POST' }
	});
}]);

app.factory('Users', ['$resource', function ($resource) {
  return $resource('/users.json', {}, {
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
}]);

app.factory('UserService', ['$resource', function ($resource) {
    return $resource('/users/:id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT', params: {id: '@id'} },
      delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);

app.factory('EmailService', ['$resource', function ($resource) {
  return $resource('/contact', {}, {
    sendEmail: { method: 'POST' }
  });
}]);

app.factory('InfoService', ['$resource', function ($resource) {
  return $resource('/info.json', {}, {
    getWebsiteInfo: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} }
  });
}]);


app.factory('ShowingService', ['$resource', function ($resource) {
  return $resource('/schedule_showing', {}, {
    scheduleShowing: { method: 'POST' }
  });
}]);

app.factory('QuestionService', ['$resource', function ($resource) {
  return $resource('/property_question', {}, {
    askQuestion: { method: 'POST' }
  });
}]);