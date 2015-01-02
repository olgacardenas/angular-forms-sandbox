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

  describe("at least x number condition", function () {
    it("generate at-least-one-number condition", function () {
      var validTarget = "gu4y";
      var noValidTarget = "guay";
      var condition = FormCondition.create({validate: 'at-least-x-number', value: 1});

      expect(condition.isValid(noValidTarget)).toBeFalsy();
      expect(condition.isValid(validTarget)).toBeTruthy();
    });

    it("generate at-least-two-number condition", function () {
      var validTarget = "gu4y123";
      var noValidTarget = "gu4y";
      var condition = FormCondition.create({validate: 'at-least-x-number', value: 2});

      expect(condition.isValid(noValidTarget)).toBeFalsy();
      expect(condition.isValid(validTarget)).toBeTruthy();
    });
  });

  describe("at least x uppercase", function () {
    it("generate at-least-one-uppercase condition", function () {
      var validTarget = "guAy";
      var noValidTarget = "guay";
      var condition = FormCondition.create({validate: 'at-least-x-uppercase', value: 1});

      expect(condition.isValid(noValidTarget)).toBeFalsy();
      expect(condition.isValid(validTarget)).toBeTruthy();
    });

    it("generate at-least-two-uppercase condition", function () {
      var validTarget = "gUAY";
      var noValidTarget = "guaY";
      var condition = FormCondition.create({validate: 'at-least-x-uppercase', value: 2});

      expect(condition.isValid(noValidTarget)).toBeFalsy();
      expect(condition.isValid(validTarget)).toBeTruthy();
    });
  });

  describe("at least x lowercase", function () {
    it("generate at-least-one-lowercase condition", function () {
      var validTarget = "GUaY";
      var noValidTarget = "GUAY";
      var condition = FormCondition.create({validate: 'at-least-x-lowercase', value: 1});

      expect(condition.isValid(noValidTarget)).toBeFalsy();
      expect(condition.isValid(validTarget)).toBeTruthy();
    });

    it("generate at-least-two-lowercase condition", function () {
      var validTarget = "guay";
      var noValidTarget = "gUAY";
      var condition = FormCondition.create({validate: 'at-least-x-lowercase', value: 2});

      expect(condition.isValid(noValidTarget)).toBeFalsy();
      expect(condition.isValid(validTarget)).toBeTruthy();
    });
  });

  describe("at least x special char", function () {
    it("generate at-least-one-special-char condition", function () {
      var validTarget = "guay!";
      var noValidTarget = "guay";
      var condition = FormCondition.create({validate: 'at-least-x-special', value: 1});

      expect(condition.isValid(noValidTarget)).toBeFalsy();
      expect(condition.isValid(validTarget)).toBeTruthy();
    });

    it("generate at-least-two-special-char condition", function () {
      var validTarget = "g$ay!!";
      var noValidTarget = "guay!";
      var condition = FormCondition.create({validate: 'at-least-x-special', value: 2});

      expect(condition.isValid(noValidTarget)).toBeFalsy();
      expect(condition.isValid(validTarget)).toBeTruthy();
    });
  });

});
