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
    var condition1 = FormCondition.create({validate: 'max-size', value: 10});
    var condition2 = FormCondition.create({validate: 'max-size', value: 2});
    expect(condition2.value).toBe(2);
    expect(condition1.value).toBe(10);
    expect(condition2.isValid(targetValue)).toBeFalsy();
    expect(condition1.isValid(targetValue)).toBeTruthy();
  });

  it("ensure target values are not null or undefined", function () {
    var condition = FormCondition.create({validate: 'max-size', value: 10});
    expect(condition.isValid(null)).toBeFalsy();
    expect(condition.isValid(undefined)).toBeFalsy();
  });
});
