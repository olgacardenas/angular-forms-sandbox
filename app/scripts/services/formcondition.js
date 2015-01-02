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

    var validate = {
      isNullOrUndefined: function (value) {
        return value === null || angular.isUndefined(value);
      },
      maxSize: function (target, value) {
        return target.length <= value;
      },
      atLeastXNumber: function (target, value) {
        var patt = new RegExp("^(.*?[0-9]){" + value + ",}.*$");
        return patt.test(target);
      },
      atLeastXUppercase: function (target, value) {
        var patt = new RegExp("^(.*?[A-Z]){" + value + ",}.*$");
        return patt.test(target);
      },
      atLeastXLowercase: function (target, value) {
        var patt = new RegExp("^(.*?[a-z]){" + value + ",}.*$");
        return patt.test(target);
      },
      atLeastXSpecial: function (target, value) {
        var patt = new RegExp("^(.*?[!@#$0^*()+]){" + value + ",}.*$");
        return patt.test(target);
      },
      atLeastXOf: function (target, conf) {
        var validCount = 0;
        angular.forEach(conf.value.validators, function(validator){
          if (isValid(validator, target)){
            validCount++;
          }
        });
        return validCount >= conf.value.count;
      }
    };

    function getValidatorFn(validationType) {
      switch (validationType) {
        case 'max-size':
          return validate.maxSize;
        case 'at-least-x-number':
          return validate.atLeastXNumber;
        case 'at-least-x-uppercase':
          return validate.atLeastXUppercase;
        case 'at-least-x-lowercase':
          return validate.atLeastXLowercase;
        case 'at-least-x-special':
          return validate.atLeastXSpecial;
        case 'at-least-x-of':
          return validate.atLeastXOf;
        default:
          return function () {
          };
      }
    }

    function isValid (conf, target){
      var validator = getValidatorFn(conf.validate);
      return !validate.isNullOrUndefined(target) && validator(target, conf.value)
    }

    var create = function (conf) {
      return {
        validate: conf.validate,
        value: conf.value,
        isValid: function (target) {
          return isValid (conf, target);
        }
      };
    };

    // Public API here
    return {
      create: create
    };
  });
