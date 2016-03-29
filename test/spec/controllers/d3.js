/*globals describe, beforeEach, afterEach, inject, it, expect, setFixtures, JGL_KARMA_GLOBAL, $*/
'use strict';

describe('Controller: d3Ctrl', function () {

    // load the controller's module
    beforeEach(module('javascriptGraphLibrariesApp'));

    var d3Ctrl,
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
        page += "            <div id=\"d3-main\" class=\"page-container\"><\/div>";
        page += "        <\/div>";
        page += "    <\/div>";
        page += "<\/div>";


        setFixtures(page);
        d3Ctrl = $controller('d3Ctrl', {
            $scope: scope
        });
    }));
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('The d3-network div should not be empty', function () {
        var url = JGL_KARMA_GLOBAL.DATA_POINTS_URL;
        httpBackend.whenGET(JGL_KARMA_GLOBAL.MAIN_VIEW_URL).respond(200, '');
        httpBackend.whenGET(JGL_KARMA_GLOBAL.DATA_D3_GANTT_CHART_URL).respond(200,
                JGL_KARMA_GLOBAL.DATA_D3_GANTT_CHART);
        httpBackend.expectGET(url).respond(200, JGL_KARMA_GLOBAL.DATA_POINTS);
        httpBackend.flush();
        var d3Html = $("#d3-network").html();
        expect(d3Html !== "").toBe(true);
    });
    it('The d3-gantt-chart-d3 div should not be empty', function () {
        var url = JGL_KARMA_GLOBAL.DATA_D3_GANTT_CHART_URL;
        httpBackend.whenGET(JGL_KARMA_GLOBAL.MAIN_VIEW_URL).respond(200, '');
        httpBackend.whenGET(JGL_KARMA_GLOBAL.DATA_POINTS_URL).respond(200,
                JGL_KARMA_GLOBAL.DATA_POINTS);
        httpBackend.expectGET(url).respond(200, JGL_KARMA_GLOBAL.DATA_D3_GANTT_CHART);
        httpBackend.flush();
        var d3GanttChart = $("#d3-gantt-chart").html();
        expect(d3GanttChart !== "").toBe(true);
    });
});
