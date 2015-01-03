'use strict';

describe('Directive: password', function () {

  // load the directive's module
  beforeEach(module('angularFormsSandboxApp'));

  var scope, form;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    var element = angular.element('<form name="form"><input ng-model="model.somepassword" name="somepassword" password /></form>');
    scope.model = {somepassword: null};
    $compile(element)(scope);
    form = scope.form;
  }));

  it('should pass with valid password', inject(function () {
    console.log(form.$valid);
    form.somepassword.$setViewValue('3eR!');
    expect(scope.model.somepassword).toEqual('3eR!');
    expect(form.$valid).toBe(true);
  }));
});
