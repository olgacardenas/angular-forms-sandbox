'use strict';

angular.module('angularFormsSandboxApp')
  .directive('password', function (FormCondition) {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        elm.conditions = {};
        var condition = FormCondition.create({
          validate: 'at-least-x-of',
          value: {
            count: 3,
            validators: [
              {validate: 'at-least-x-number', value: 1},
              {validate: 'at-least-x-uppercase', value: 1},
              {validate: 'at-least-x-lowercase', value: 1},
              {validate: 'at-least-x-special', value: 1}
            ]
          }
        });

        ctrl.$parsers.unshift(function(modelValue) {
          if (condition.isValid(modelValue)) {
            // it is valid
            ctrl.$setValidity('password', true);
            return modelValue;
          } else {
            // it is invalid, return undefined (no model update)
            ctrl.$setValidity('password', false);
            return undefined;
          }
        });
      }
    };
  });
