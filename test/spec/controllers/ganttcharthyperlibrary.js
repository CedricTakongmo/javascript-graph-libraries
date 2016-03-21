'use strict';

describe('Controller: GanttcharthyperlibraryCtrl', function () {

  // load the controller's module
  beforeEach(module('javascriptGraphLibrariesApp'));

  var GanttcharthyperlibraryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GanttcharthyperlibraryCtrl = $controller('GanttcharthyperlibraryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
