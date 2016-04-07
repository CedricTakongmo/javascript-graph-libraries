/*globals window, angular, d3*/
'use strict';

/**
 * @ngdoc function
 * @name Controller.Controller:d3Ctrl
 * @returns {void} void function
 * @requires window
 * @requires angular
 * @requires d3
 * @param {object} $scope $scope
 * @param {object} d3NetworkFactory d3NetworkFactory
 * @param {object} d3GanttChartControllFactory d3GanttChartControllFactory
 * @returns {undefined} void
 * @description
 * # d3 - Controller
 * D3.js is a JavaScript library for manipulating documents based on data.
 * D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on
 * web standards gives you the full capabilities of modern browsers without
 * tying yourself to a proprietary framework, combining powerful visualization
 * components and a data-driven approach to DOM manipulation.
 */
angular.module('javascriptGraphLibrariesApp')
        .controller('d3Ctrl', ['$scope', 'd3NetworkFactory', 'd3GanttChartControllFactory', function($scope, d3NetworkFactory, d3GanttChartControllFactory) {
          d3NetworkFactory.initializate().success(d3NetworkFactory.draw).error(function(error) {
            alert(error);
          });
          d3GanttChartControllFactory.initializate().success(function(data) {
            var g = d3GanttChartControllFactory.draw(data.tasks);
            $scope.addTask = g.addTask;
            $scope.removeTask = g.removeTask;
            $scope.changeTimeDomain = g.changeTimeDomain;
          }).error(function(error) {
            alert(error);
          });
          $scope.$on('$routeChangeStart', function() {
            d3NetworkFactory.setHasViewChanged(true);
          });
        }]);
