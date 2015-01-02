'use strict';

describe('Service: FormCondition', function () {

  // load the service's module
  beforeEach(module('angularFormsSandboxApp'));

  // instantiate service
  var FormCondition;
  beforeEach(inject(function (_FormCondition_) {
    FormCondition = _FormCondition_;
  }));

  describe("size conditions", function () {
    it("generates max size condition", function () {
      var targetValue = "1234";

      var validCondition = FormCondition.create({validate: 'max-size', value: 10});
      var noValidCondition = FormCondition.create({validate: 'max-size', value: 2});

      expect(noValidCondition.value).toBe(2);
      expect(validCondition.value).toBe(10);

      expect(noValidCondition.isValid(targetValue)).toBeFalsy();
      expect(validCondition.isValid(targetValue)).toBeTruthy();
    });

    it("ensure target values are not null or undefined", function () {
      var condition = FormCondition.create({validate: 'max-size', value: 10});
      expect(condition.isValid(null)).toBeFalsy();
      expect(condition.isValid(undefined)).toBeFalsy();
    });
  });

  function evaluateCondition(validTargets, noValidTargets, validationType, validationValue) {
    var condition = FormCondition.create({validate: validationType, value: validationValue});

    angular.forEach(noValidTargets, function (value) {
      expect(condition.isValid(value)).toBeFalsy();
    });

    angular.forEach(validTargets, function (value) {
      expect(condition.isValid(value)).toBeTruthy();
    });
  }

  describe("at least x number condition", function () {
    it("generate at-least-one-number condition", function () {
      var validTargets = ["gu4y"];
      var noValidTargets = ["guay"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-number', 1);
    });

    it("generate at-least-two-number condition", function () {
      var validTargets = ["gu4y123", "gu4y1"];
      var noValidTargets = ["gu4y"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-number', 2);
    });
  });

  describe("at least x uppercase", function () {
    it("generate at-least-one-uppercase condition", function () {
      var validTargets = ["guAy"];
      var noValidTargets = ["guay"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-uppercase', 1);
    });

    it("generate at-least-two-uppercase condition", function () {
      var validTargets = ["gUAY", "gUAy"];
      var noValidTargets = ["guaY"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-uppercase', 2);
    });
  });

  describe("at least x lowercase", function () {
    it("generate at-least-one-lowercase condition", function () {
      var validTargets = ["GUaY"];
      var noValidTargets = ["GUAY"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-lowercase', 1);
    });

    it("generate at-least-two-lowercase condition", function () {
      var validTargets = ["gUay", "GUay"];
      var noValidTargets = ["gUAY"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-lowercase', 2);
    });
  });

  describe("at least x special char", function () {
    it("generate at-least-one-special-char condition", function () {
      var validTargets = ["guay!", "guay$", "g*ay"];
      var noValidTargets = ["guay", "gu\\y", "gu<y", "gu>y", 'gu"y', "gu&y", "gu-y"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-special', 1);
    });

    it("generate at-least-two-special-char condition", function () {
      var validTargets = ["g$ay!!", "g$ay!"];
      var noValidTargets = ["guay!", "gu&y!", "g&-y"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-special', 2);
    });
  });

  describe("at least x of given conditions", function () {
    it("generate at-least-2-of conditions (one)", function () {
      var validTargets = ["gU4y", "gu4y", "g*4y", "gUay", "Guay!", "guay!"];
      var noValidTargets = ["1234", "GUAY", "guay", "$%*!"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-of', {
        value: {
          count: 2,
          validators: [
            {validate: 'at-least-x-number', value: 1},
            {validate: 'at-least-x-uppercase', value: 1},
            {validate: 'at-least-x-lowercase', value: 1},
            {validate: 'at-least-x-special', value: 1}
          ]
        }
      });
    });

    it("generate at-least-2-of conditions (several limits)", function () {
      var validTargets = ["gU4Y$!", "gu$$4yYY", "gU**4Ay", "g$!UAy", "GUay!!", "!gUAy!"];
      var noValidTargets = ["1234", "GUAY", "guay", "$%*!", "!gUay"];
      evaluateCondition(validTargets, noValidTargets, 'at-least-x-of', {
        value: {
          count: 2,
          validators: [
            {validate: 'at-least-x-number', value: 1},
            {validate: 'at-least-x-uppercase', value: 2},
            {validate: 'at-least-x-lowercase', value: 1},
            {validate: 'at-least-x-special', value: 2}
          ]
        }
      });
    });
  });

});
