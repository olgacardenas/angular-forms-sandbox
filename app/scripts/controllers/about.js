'use strict';

/**
 * @ngdoc function
 * @name angularFormsSandboxApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularFormsSandboxApp
 */
angular.module('angularFormsSandboxApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
