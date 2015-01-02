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
        var patt = new RegExp("[0-9_]{" + value + "}");
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
        var patt = new RegExp("^(.*?[!@#0^*()+]){" + value + ",}.*$");
        return patt.test(target);
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
        default:
          return function () {
          };
      }
    }

    var create = function (conf) {
      var validator = getValidatorFn(conf.validate);

      return {
        validate: conf.validate,
        value: conf.value,
        isValid: function (target) {
          return !validate.isNullOrUndefined(target) && validator(target, this.value);
        }
      };
    };

    // Public API here
    return {
      create: create
    };
  });
