/*globals describe, beforeEach, afterEach, inject, it, expect, setFixtures, JGL_KARMA_GLOBAL, $*/
'use strict';

describe('Controller: raphaeldraculaCtrl', function () {

    // load the controller's module
    beforeEach(module('javascriptGraphLibrariesApp'));

    var raphaeldraculaCtrl,
            scope,
            httpBackend,
            $location;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$location_, $httpBackend) {
        scope = $rootScope.$new();
        $location = _$location_;
        httpBackend = $httpBackend;
        var page = "";
        page += "<div class=\"row\">";
        page += "    <div class=\"box\">";
        page += "        <div class=\"col-lg-12\">";
        page += "            <span us-spinner=\"{radius:30, width:8, length: 16}\"><\/span>";
        page += "            <div id=\"raphaeldracula-main\" class=\"page-container\"><\/div>";
        page += "        <\/div>";
        page += "    <\/div>";
        page += "<\/div>";
        setFixtures(page);
        raphaeldraculaCtrl = $controller('raphaeldraculaCtrl', {
            $scope: scope
        });
    }));
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('The dracula graph div #network should not be empty', function () {
        var url = JGL_KARMA_GLOBAL.DATA_POINTS_URL,
        httpResponse = JGL_KARMA_GLOBAL.DATA_POINTS,
        exist;
        httpBackend.whenGET(JGL_KARMA_GLOBAL.MAIN_VIEW_URL).respond(200, '');
		httpBackend.expectGET(url).respond(200, httpResponse);
        httpBackend.flush();
        exist = $("#raphaeldracula-main svg").length;
        expect(exist).toBe(1);
    });
});

