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

    function validateMaxSize (target, value) {
      return target.length <= value;
    }

    function validateAtLeastXNumber (target, value){
      var patt = new RegExp("[0-9_]{" + value + "}");
      return patt.test(target);
    }

    function validateAtLeastXUppercase (target, value){
      var patt = new RegExp("^(.*?[A-Z]){" + value + ",}.*$");
      return patt.test(target);
    }

    function validateAtLeastXLowercase (target, value){
      var patt = new RegExp("^(.*?[a-z]){" + value + ",}.*$");
      return patt.test(target);
    }

    function getValidatorFn (validationType){
      switch (validationType){
        case 'max-size': return validateMaxSize;
        case 'at-least-x-number': return validateAtLeastXNumber;
        case 'at-least-x-uppercase': return validateAtLeastXUppercase;
        case 'at-least-x-lowercase': return validateAtLeastXLowercase;
        default: return function (){};
      }
    }

    var create = function (conf){
      var validator = getValidatorFn (conf.validate);

      return  {
        validate: conf.validate,
        value: conf.value,
        isValid: function (target){
          return !isNullOrUndefined(target) && validator(target, this.value);
        }
      };
    };

    // Public API here
    return {
      create: create
    };
  });
