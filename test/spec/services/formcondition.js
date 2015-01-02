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
    var targetValue ="1234";
    var condition1 = FormCondition.create({ type: 'max-size', value: 10});
    var condition2 = FormCondition.create({ type: 'max-size', value: 2});
    expect(condition2.value).toBe(2);
    expect(condition1.value).toBe(10);
    expect(condition2.isValid(targetValue)).toBeFalsy();
    expect(condition1.isValid(targetValue)).toBeTruthy();
  });
});
