'use strict';

/**
 * @ngdoc service
 * @name angularFormsSandboxApp.FormCondition
 * @description
 * # FormCondition
 * Factory in the angularFormsSandboxApp.
 */
angular.module('angularFormsSandboxApp')
  .factory('FormCondition', function () {

    var create = function (conf){
      var ret = {};

      ret = {
        type: conf.type,
        value: conf.value,
        isValid: function (target){
          return target.length <= this.value;
        }
      };
      return ret;
    };

    // Public API here
    return {
      create: create
    };
  });
