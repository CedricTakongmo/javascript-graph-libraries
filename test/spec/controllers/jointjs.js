/*globals describe, beforeEach, afterEach, inject, it, expect, setFixtures, JGL_KARMA_GLOBAL, $*/
'use strict';

describe('Controller: jointjsCtrl', function () {

    // load the controller's module
    beforeEach(module('javascriptGraphLibrariesApp'));

    var jointjsCtrl,
            scope,
            httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        var page = "";
        page += "<div class=\"row\">";
        page += "    <div class=\"box\">";
        page += "        <div class=\"col-lg-12\">";
        page += "            <span us-spinner=\"{radius:30, width:8, length: 16}\"><\/span>";
        page += "            <div id=\"jointjs-network\" class=\"page-container\"><\/div>";
        page += "        <\/div>";
        page += "    <\/div>";
        page += "    <div class=\"box\">";
        page += "        <div class=\"col-lg-12\">";
        page += "            <div id=\"jointjs-organizational\" class=\"page-container\"><\/div>";
        page += "        <\/div>";
        page += "    <\/div>";
        page += "    <div class=\"box\">";
        page += "        <div class=\"col-lg-12\">";
        page += "            <div id=\"jointjs-petrinet\" class=\"page-container\"><\/div>";
        page += "        <\/div>";
        page += "    <\/div>";
        page += "<\/div> ";

        setFixtures(page);
        jointjsCtrl = $controller('jointjsCtrl', {
            $scope: scope
        });
    }));
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('The jointjs-main div should not be empty', function () {
        var url = JGL_KARMA_GLOBAL.DATA_POINTS_URL,
                httpResponse = JGL_KARMA_GLOBAL.DATA_POINTS;
        httpBackend.whenGET(JGL_KARMA_GLOBAL.MAIN_VIEW_URL).respond(200, '');
        httpBackend.expectGET(url).respond(200, httpResponse);
        httpBackend.flush();
        var jointJsHtml = $("#jointjs-network").html();
        expect(jointJsHtml !== "").toBe(true);
    });
    it('The jointjs-organizational div should not be empty', function () {
        var url = JGL_KARMA_GLOBAL.DATA_POINTS_URL,
                httpResponse = JGL_KARMA_GLOBAL.DATA_POINTS;
        httpBackend.whenGET(JGL_KARMA_GLOBAL.MAIN_VIEW_URL).respond(200, '');
        httpBackend.expectGET(url).respond(200, httpResponse);
        httpBackend.flush();
        var jointjsOrganizational = $("#jointjs-organizational").html();
        expect(jointjsOrganizational !== "").toBe(true);
    });
    it('The jointjs-petrinet div should not be empty', function () {
        var url = JGL_KARMA_GLOBAL.DATA_POINTS_URL,
                httpResponse = JGL_KARMA_GLOBAL.DATA_POINTS;
        httpBackend.whenGET(JGL_KARMA_GLOBAL.MAIN_VIEW_URL).respond(200, '');
        httpBackend.expectGET(url).respond(200, httpResponse);
        httpBackend.flush();
        var jointjsPetrinet = $("#jointjs-petrinet").html();
        expect(jointjsPetrinet !== "").toBe(true);
    });
});
