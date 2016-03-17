/*globals describe, beforeEach, afterEach, inject, it, expect, setFixtures, JGL_KARMA_GLOBAL*/
'use strict';

describe('Controller: ConfigCtrl', function () {

    // load the controller's module
    beforeEach(module('javascriptGraphLibrariesApp'));

    var ConfigCtrl,
            scope,
            httpBackend,
            settings,
            translate;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, appSettings, $httpBackend, $translate) {
        scope = $rootScope.$new();
        settings = appSettings;
        httpBackend = $httpBackend;
        var page = "";
        page += "<div class=\"row\">";
        page += "    <div class=\"box\">";
        page += "        <div class=\"col-lg-12\">";
        page += "            <span us-spinner=\"{radius:30, width:8, length: 16}\"><\/span> ";
        page += "            <div id=\"config-main\" class=\"page-container\">";
        page += "                <h4>Language - Configure your language<\/h4>";
        page += "                <div class=\"jgl-language-picker\"><\/div>";
        page += "                <h4>Performance - Ability to work under big data<\/h4>";
        page += "                <pre>Data Source : <b>{{perfSetting.url|| 'null'}}<\/b><\/pre>";
        page += "                <div ng-repeat=\"perfOption in perfSetOptions\" class=\"btn-group\">";
        page += "                    <label class=\"btn btn-success\" ng-class=\"{ active: perfIsActive(perfOption)}\" ng-click=\"perfSetDataSource(perfOption)\">{{perfOption.name}}<\/label>";
        page += "                <\/div>";
        page += "            <\/div>";
        page += "        <\/div>";
        page += "    <\/div>";
        page += "<\/div>";


        setFixtures(page);
        ConfigCtrl = $controller('ConfigCtrl', {
            $scope: scope,
            $translate: $translate
        });
    }));
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

  /*  it('The configCtrl should give the right default config', function () {
        httpBackend.whenGET(JGL_KARMA_GLOBAL.MAIN_VIEW_URL).respond(200, '');
        httpBackend.expectGET(JGL_KARMA_GLOBAL.DATA_PERFORMANCE_URL).respond(200, JGL_KARMA_GLOBAL.DATA_PERFORMANCE);
        httpBackend.expectGET(JGL_KARMA_GLOBAL.DATA_LANGUAGE_URL).respond(200, JGL_KARMA_GLOBAL.DATA_LANGUAGE);
        httpBackend.flush();
        expect(scope.perfSetting).toEqual(settings.performance);
        expect(scope.perfSetOptions.length).toBe(3);
        expect(scope.perfIsActive(settings.performance)).toBe(true);
        scope.perfSetDataSource(scope.perfSetOptions[0]);
        expect(settings.performance).toEqual(scope.perfSetOptions[0]);
    });*/
});

