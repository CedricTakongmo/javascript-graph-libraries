/*globals describe, beforeEach, inject, it, expect*/
'use strict';

describe('Controller: jsplumbCtrl', function () {

    // load the controller's module
    beforeEach(module('javascriptGraphLibrariesApp'));

    var jsplumbCtrl,
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
        page += "            <span us-spinner=\"{radius:30, width:8, length: 16}\"><\/span> ";
        page += "            <div id=\"jsplumb-main\" class=\"page-container jsplumb-main\">";
        page += "                <div class=\"jtk-demo-canvas canvas-wide dynamic-demo jtk-surface jtk-surface-nopan\" id=\"canvas\">";
        page += "                <\/div>";
        page += "            <\/div>";
        page += "        <\/div>";
        page += "    <\/div>";
        page += "<\/div>";

        setFixtures(page);
        jsplumbCtrl = $controller('jsplumbCtrl', {
            $scope: scope
        });
    }));
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('The jsPlumb div #jsplumb-main canvas should not be empty', function () {
        var url = JGL_KARMA_GLOBAL.DATA_POINTS_URL;
        var httpResponse = JGL_KARMA_GLOBAL.DATA_POINTS;
        httpBackend.expectGET(url).respond(200, httpResponse);
        httpBackend.flush();
        var existCanvas = $("#jsplumb-main #canvas").html();
        expect(existCanvas !== "").toBe(true);
    });
});

