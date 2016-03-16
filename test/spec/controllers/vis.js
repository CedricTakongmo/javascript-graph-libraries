/*globals describe, beforeEach, afterEach, inject, it, expect, setFixtures, JGL_KARMA_GLOBAL, $*/
'use strict';

describe('Controller: visCtrl', function () {

    // load the controller's module
    beforeEach(module('javascriptGraphLibrariesApp'));

    var visCtrl,
            scope,
            httpBackend,
            $location;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$location_, $httpBackend) {
        scope = $rootScope.$new();
        $location = _$location_;
        httpBackend = $httpBackend;
        var page = "";
        page += "<style type=\"text\/css\">";
        page += "    .vis-main table.view {";
        page += "        width: 100%;";
        page += "    }";
        page += "    .vis-main table td {";
        page += "        vertical-align: top;";
        page += "    }";
        page += "    .vis-main table table {";
        page += "        background-color: #f5f5f5;";
        page += "        border: 1px solid #e5e5e5;";
        page += "    }";
        page += "    .vis-main table table td {";
        page += "        vertical-align: middle;";
        page += "    }";
        page += "    .vis-main input[type=text],";
        page += "    .vis-main pre {";
        page += "        border: 1px solid lightgray;";
        page += "    }";
        page += "    .vis-main pre {";
        page += "        margin: 0;";
        page += "        padding: 5px;";
        page += "        font-size: 10pt;";
        page += "    }";
        page += "    .vis-main #network {";
        page += "        width: 100%;";
        page += "        height: 400px;";
        page += "        border: 1px solid lightgray;";
        page += "    }";
        page += "<\/style>";
        page += "<div class=\"row\">";
        page += "    <div class=\"box\">";
        page += "        <div class=\"col-lg-12 vis-main\">";
        page += "            <span us-spinner=\"{radius:30, width:8, length: 16}\"><\/span>";
        page += "            <p>";
        page += "                This example demonstrates dynamically adding, updating and removing nodes and edges using a DataSet.";
        page += "            <\/p>";
        page += "            <h1>Adjust<\/h1>";
        page += "            <table>";
        page += "                <tr>";
        page += "                    <td>";
        page += "                        <h2>Node<\/h2>";
        page += "                        <table>";
        page += "                            <tr>";
        page += "                                <td><\/td>";
        page += "                                <td><label for=\"node-id\">Id<\/label><\/td>";
        page += "                                <td><input id=\"node-id\" class=\"form-control\" type=\"text\" value=\"6\"><\/td>";
        page += "                            <\/tr>";
        page += "                            <tr>";
        page += "                                <td><\/td>";
        page += "                                <td><label for=\"node-label\">Label<\/label><\/td>";
        page += "                                <td><input id=\"node-label\" class=\"form-control\" type=\"text\" value=\"Node 6\"><\/td>";
        page += "                            <\/tr>";
        page += "                            <tr>";
        page += "                                <td><\/td>";
        page += "                                <td>Action<\/td>";
        page += "                                <td>";
        page += "                                    <button id=\"node-add\" class=\"btn btn-primary\" ng-click=\"addNode();\">Add<\/button>";
        page += "                                    <button id=\"node-update\" class=\"btn btn-primary\" ng-click=\"updateNode();\">Update<\/button>";
        page += "                                    <button id=\"node-remove\" class=\"btn btn-primary\" ng-click=\"removeNode();\">Remove<\/button>";
        page += "                                <\/td>";
        page += "                            <\/tr>";
        page += "                        <\/table>";
        page += "                    <\/td>";
        page += "                    <td>";
        page += "                        <h2>Edge<\/h2>";
        page += "                        <table>";
        page += "                            <tr>";
        page += "                                <td><\/td>";
        page += "                                <td><label for=\"edge-id\">Id<\/label><\/td>";
        page += "                                <td><input id=\"edge-id\" class=\"form-control\" type=\"text\" value=\"5\"><\/td>";
        page += "                            <\/tr>";
        page += "                            <tr>";
        page += "                                <td><\/td>";
        page += "                                <td><label for=\"edge-from\">From<\/label><\/td>";
        page += "                                <td><input id=\"edge-from\" class=\"form-control\" type=\"text\" value=\"3\"><\/td>";
        page += "                            <\/tr>";
        page += "                            <tr>";
        page += "                                <td><\/td>";
        page += "                                <td><label for=\"edge-to\">To<\/label><\/td>";
        page += "                                <td><input id=\"edge-to\" class=\"form-control\" type=\"text\" value=\"4\"><\/td>";
        page += "                            <\/tr>";
        page += "                            <tr>";
        page += "                                <td><\/td>";
        page += "                                <td>Action<\/td>";
        page += "                                <td>";
        page += "                                    <button id=\"edge-add\" class=\"btn btn-primary\" ng-click=\"addEdge();\">Add<\/button>";
        page += "                                    <button id=\"edge-update\" class=\"btn btn-primary\" ng-click=\"updateEdge();\">Update<\/button>";
        page += "                                    <button id=\"edge-remove\" class=\"btn btn-primary\" ng-click=\"removeEdge();\">Remove<\/button>";
        page += "                                <\/td>";
        page += "                            <\/tr>";
        page += "                        <\/table>";
        page += "                    <\/td>";
        page += "                <\/tr>";
        page += "            <\/table>";
        page += "            <h1>View<\/h1>";
        page += "            <table class=\"view\">";
        page += "                <colgroup>";
        page += "                    <col width=\"25%\">";
        page += "                    <col width=\"25%\">";
        page += "                    <col width=\"50%\">";
        page += "                <\/colgroup>";
        page += "                <tr>";
        page += "                    <td>";
        page += "                        <h2>Nodes<\/h2>";
        page += "                        <pre id=\"nodes\"><\/pre>";
        page += "                    <\/td>";
        page += "                    <td>";
        page += "                        <h2>Edges<\/h2>";
        page += "                        <pre id=\"edges\"><\/pre>";
        page += "                    <\/td>";
        page += "                    <td>";
        page += "                        <h2>Network<\/h2>";
        page += "                        <div id=\"network\"><\/div>";
        page += "                    <\/td>";
        page += "                <\/tr>";
        page += "            <\/table>";
        page += "			";
        page += "        <\/div>";
        page += "    <\/div>";
        page += "<\/div>";

        setFixtures(page);
        visCtrl = $controller('visCtrl', {
            $scope: scope
        });
    }));
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('The vis.js div #network should not be empty', function () {
        var url = JGL_KARMA_GLOBAL.DATA_POINTS_URL,
        httpResponse = JGL_KARMA_GLOBAL.DATA_POINTS,
        exist;
        httpBackend.expectGET(url).respond(200, httpResponse);
        httpBackend.flush();
        exist = $("#network canvas").length;
        expect(exist).toBe(1);
    });
});

