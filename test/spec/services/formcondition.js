'use strict';

describe('Service: FormCondition', function () {

  // load the service's module
  beforeEach(module('angularFormsSandboxApp'));

  // instantiate service
  var FormCondition;
  beforeEach(inject(function (_FormCondition_) {
    FormCondition = _FormCondition_;
  }));

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

  it("generate at-least-one-number condition", function () {
    var validTarget = "gu4y";
    var noValidTarget = "guay";
    var condition = FormCondition.create({validate: 'at-least-x-number', value: 1});

    expect(condition.isValid(noValidTarget)).toBeFalsy();
    expect(condition.isValid(validTarget)).toBeTruthy();
  });
});
