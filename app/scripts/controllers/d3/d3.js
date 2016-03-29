/*globals window, angular, d3*/
'use strict';

/**
 * @ngdoc function
 * @name javascriptGraphLibrariesApp.controller:d3Ctrl
 * @description
 * # d3Ctrl
 * Controller of the javascriptGraphLibrariesApp
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('d3Ctrl', ['$scope', 'd3Network', 'd3GanttChart', function ($scope, d3Network, d3GanttChart) {
                d3Network.initializate().success(d3Network.draw).error(function (error) {
                    alert(error);
                });
                d3GanttChart.initializate().success(function (data) {
                    var g = d3GanttChart.draw(data.tasks);
                    $scope.addTask = g.addTask;
                    $scope.removeTask = g.removeTask;
                    $scope.changeTimeDomain = g.changeTimeDomain;
                }).error(function (error) {
                    alert(error);
                });
                $scope.$on('$routeChangeStart', function () {
                    d3Network.setHasViewChanged(true);
                });
            }]);
