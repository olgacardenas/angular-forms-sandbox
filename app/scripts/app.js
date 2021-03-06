'use strict';

/**
 * @ngdoc overview
 * @name angularFormsSandboxApp
 * @description
 * # angularFormsSandboxApp
 *
 * Main module of the application.
 */
angular
  .module('angularFormsSandboxApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
