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

    function isNullOrUndefined (value){
      return value === null || angular.isUndefined(value);
    }

    var create = function (conf){
      var ret = {};

      ret = {
        validate: conf.validate,
        value: conf.value,
        isValid: function (target){
          return !isNullOrUndefined(target) && target.length <= this.value;
        }
      };
      return ret;
    };

    // Public API here
    return {
      create: create
    };
  });
