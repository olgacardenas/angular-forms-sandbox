'use strict';

/**
 * @ngdoc function
 * @name angularFormsSandboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFormsSandboxApp
 */
angular.module('angularFormsSandboxApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
