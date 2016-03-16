/*globals describe, beforeEach, inject, it, expect*/
'use strict';

describe('Controller: headerCtrl', function () {

    // load the controller's module
    beforeEach(module('javascriptGraphLibrariesApp'));

    var headerCtrl,
            scope,
            $location;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$location_) {
        scope = $rootScope.$new();
        $location = _$location_;
        headerCtrl = $controller('headerCtrl', {
            $scope: scope
        });
    }));

    it('should return a boolean true if the passed string match the actual link location', function () {
        $location.path('/about');
        expect(scope.isActive('/about')).toBe(true);
        $location.path('/vis');
        expect(scope.isActive('/about')).toBe(false);
    });
});
