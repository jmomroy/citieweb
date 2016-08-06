angular
  .module('appCitie', [
    'ngRoute',
    'ngCookies',
    'appServices',
    'ngToast'
  ])
  .run(function($rootScope, $location, $cookieStore, $http, User, Rol){
    $rootScope.$on('$routeChangeStart', function (event,next,current) {

    });
  }).config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard/index.html',
        controller: 'indexController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
